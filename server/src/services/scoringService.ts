import * as ort from 'onnxruntime-node'
import path from 'path'
import { Score, IScoreBreakdown } from '../models/Score'
import { IApplication } from '../models/Application'
import mongoose from 'mongoose'

// ONNX Model Session - loaded once at startup
let session: ort.InferenceSession | null = null

// Model input field mappings based on German Credit Dataset encoding

/**
 * Status of existing checking account
 * A11: < 0 DM
 * A12: 0 <= ... < 200 DM
 * A13: >= 200 DM / salary assignments for at least 1 year
 * A14: no checking account
 */
const STATUS_MAPPING = {
  LOW: 'A11',      // < 0 (overdraft)
  MEDIUM: 'A12',   // 0-200
  HIGH: 'A13',     // >= 200 or salary
  NONE: 'A14'      // no checking account
}

/**
 * Credit history
 * A30: no credits taken/all credits paid back duly
 * A31: all credits at this bank paid back duly
 * A32: existing credits paid back duly till now
 * A33: delay in paying off in the past
 * A34: critical account/other credits existing
 */
const CREDIT_HISTORY_MAPPING = {
  EXCELLENT: 'A30',
  GOOD: 'A31',
  FAIR: 'A32',
  POOR: 'A33',
  CRITICAL: 'A34'
}

/**
 * Purpose of loan
 * A40: car (new)
 * A41: car (used)
 * A42: furniture/equipment
 * A43: radio/television
 * A44: domestic appliances
 * A45: repairs
 * A46: education
 * A47: vacation
 * A48: retraining
 * A49: business
 * A410: others
 */
const PURPOSE_MAPPING: Record<string, string> = {
  'Business': 'A49',
  'Education': 'A46',
  'Car': 'A40',
  'Home Improvement': 'A42',
  'Personal': 'A410',
  'Medical': 'A410',
  'Debt Consolidation': 'A410',
  'Agriculture': 'A49',
  'Farming': 'A49',
  'Livelihood': 'A49',
  'default': 'A410'
}

/**
 * Savings account/bonds
 * A61: < 100 DM
 * A62: 100 <= ... < 500 DM
 * A63: 500 <= ... < 1000 DM
 * A64: >= 1000 DM
 * A65: unknown/no savings account
 */
const SAVINGS_MAPPING = {
  VERY_LOW: 'A61',
  LOW: 'A62',
  MEDIUM: 'A63',
  HIGH: 'A64',
  UNKNOWN: 'A65'
}

/**
 * Present employment since
 * A71: unemployed
 * A72: < 1 year
 * A73: 1 <= ... < 4 years
 * A74: 4 <= ... < 7 years
 * A75: >= 7 years
 */
const EMPLOYMENT_MAPPING = {
  UNEMPLOYED: 'A71',
  LESS_THAN_1_YEAR: 'A72',
  ONE_TO_FOUR_YEARS: 'A73',
  FOUR_TO_SEVEN_YEARS: 'A74',
  SEVEN_PLUS_YEARS: 'A75'
}

/**
 * Personal status and sex
 * A91: male - divorced/separated
 * A92: female - divorced/separated/married
 * A93: male - single
 * A94: male - married/widowed
 * A95: female - single
 */
const PERSONAL_STATUS_MAPPING: Record<string, string> = {
  'male': 'A93',
  'female': 'A92',
  'Male': 'A93',
  'Female': 'A92',
  'M': 'A93',
  'F': 'A92',
  'default': 'A93'
}

/**
 * Other debtors/guarantors
 * A101: none
 * A102: co-applicant
 * A103: guarantor
 */
const OTHER_DEBTORS_DEFAULT = 'A101' // none

/**
 * Property
 * A121: real estate
 * A122: building society savings/life insurance
 * A123: car or other
 * A124: unknown/no property
 */
const PROPERTY_MAPPING = {
  REAL_ESTATE: 'A121',
  SAVINGS_INSURANCE: 'A122',
  CAR_OTHER: 'A123',
  NONE: 'A124'
}

/**
 * Other installment plans
 * A141: bank
 * A142: stores
 * A143: none
 */
const OTHER_INSTALLMENT_DEFAULT = 'A143' // none

/**
 * Housing
 * A151: rent
 * A152: own
 * A153: for free
 */
const HOUSING_MAPPING = {
  RENT: 'A151',
  OWN: 'A152',
  FREE: 'A153'
}

/**
 * Job
 * A171: unemployed/unskilled - non-resident
 * A172: unskilled - resident
 * A173: skilled employee/official
 * A174: management/self-employed/highly qualified
 */
const JOB_MAPPING: Record<string, string> = {
  'unemployed': 'A171',
  'unskilled': 'A172',
  'skilled': 'A173',
  'professional': 'A174',
  'self-employed': 'A174',
  'Farmer': 'A173',
  'Fisherman': 'A173',
  'Vendor': 'A172',
  'Laborer': 'A172',
  'Teacher': 'A173',
  'Government Employee': 'A173',
  'Business Owner': 'A174',
  'default': 'A173'
}

/**
 * Telephone
 * A191: none
 * A192: yes, registered under customer's name
 */
const TELEPHONE_DEFAULT = 'A192' // assume they have phone (they're using the app)

/**
 * Foreign worker
 * A201: yes
 * A202: no
 */
const FOREIGN_WORKER_DEFAULT = 'A202' // assume local worker

interface UserContext {
  age?: number
  gender?: string
  income?: number
  livelihood?: string
  district?: string
}

interface ScoringResult {
  probability: number
  creditworthy: boolean
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  breakdown: IScoreBreakdown
}

export class ScoringService {
  /**
   * Initialize the ONNX model - call this once at server startup
   */
  static async initialize(): Promise<void> {
    try {
      const modelPath = path.join(__dirname, '../ml/fintrust_credit_model.onnx')
      session = await ort.InferenceSession.create(modelPath)
      console.log('✅ ONNX Credit Risk Model loaded successfully')
    } catch (error) {
      console.error('❌ Failed to load ONNX model:', error)
      throw error
    }
  }

  /**
   * Check if the model is loaded and ready
   */
  static isReady(): boolean {
    return session !== null
  }

  /**
   * Generate mock/simulated external data based on available user context
   * This bridges the gap between simple frontend data and complex model requirements
   */
  private static generateMockData(
    application: IApplication,
    userContext: UserContext
  ): IScoreBreakdown {
    const income = userContext.income || 3000
    const age = userContext.age || 30
    const gender = userContext.gender || 'male'
    const livelihood = userContext.livelihood || 'skilled'

    // Derive status (checking account) based on income
    let status: string
    if (income < 2000) {
      status = STATUS_MAPPING.LOW
    } else if (income < 5000) {
      status = STATUS_MAPPING.MEDIUM
    } else if (income < 10000) {
      status = STATUS_MAPPING.HIGH
    } else {
      status = STATUS_MAPPING.HIGH
    }

    // Derive loan duration (in months) based on loan amount and income
    // Assume standard 12-48 month terms
    const loanAmount = application.loanAmount || 5000
    const monthlyPaymentCapacity = income * 0.3 // 30% of income
    let duration = Math.ceil(loanAmount / monthlyPaymentCapacity)
    duration = Math.max(6, Math.min(duration, 48)) // Clamp between 6-48 months

    // Credit history - use age as proxy (older = more history)
    let creditHistory: string
    if (age >= 40) {
      creditHistory = CREDIT_HISTORY_MAPPING.GOOD
    } else if (age >= 30) {
      creditHistory = CREDIT_HISTORY_MAPPING.FAIR
    } else if (age >= 25) {
      creditHistory = CREDIT_HISTORY_MAPPING.FAIR
    } else {
      creditHistory = CREDIT_HISTORY_MAPPING.CRITICAL // Young, limited history
    }

    // Map purpose from application
    const purposeKey = application.purpose || 'default'
    const purpose = PURPOSE_MAPPING[purposeKey] || PURPOSE_MAPPING['default']

    // Savings based on income level
    let savings: string
    if (income < 2000) {
      savings = SAVINGS_MAPPING.VERY_LOW
    } else if (income < 4000) {
      savings = SAVINGS_MAPPING.LOW
    } else if (income < 7000) {
      savings = SAVINGS_MAPPING.MEDIUM
    } else {
      savings = SAVINGS_MAPPING.HIGH
    }

    // Employment duration based on age (rough estimate)
    let employment: string
    if (age < 22) {
      employment = EMPLOYMENT_MAPPING.LESS_THAN_1_YEAR
    } else if (age < 26) {
      employment = EMPLOYMENT_MAPPING.ONE_TO_FOUR_YEARS
    } else if (age < 32) {
      employment = EMPLOYMENT_MAPPING.FOUR_TO_SEVEN_YEARS
    } else {
      employment = EMPLOYMENT_MAPPING.SEVEN_PLUS_YEARS
    }

    // Installment rate (% of disposable income) - 1-4 scale
    const installmentRatio = (loanAmount / duration) / income
    let installmentRate: number
    if (installmentRatio < 0.15) {
      installmentRate = 1
    } else if (installmentRatio < 0.25) {
      installmentRate = 2
    } else if (installmentRatio < 0.35) {
      installmentRate = 3
    } else {
      installmentRate = 4
    }

    // Personal status based on gender
    const personalStatusSex = PERSONAL_STATUS_MAPPING[gender] || PERSONAL_STATUS_MAPPING['default']

    // Residence duration based on age
    let residenceSince: number
    if (age < 25) {
      residenceSince = 1
    } else if (age < 35) {
      residenceSince = 2
    } else if (age < 45) {
      residenceSince = 3
    } else {
      residenceSince = 4
    }

    // Property based on income
    let property: string
    if (income >= 8000) {
      property = PROPERTY_MAPPING.REAL_ESTATE
    } else if (income >= 5000) {
      property = PROPERTY_MAPPING.SAVINGS_INSURANCE
    } else if (income >= 3000) {
      property = PROPERTY_MAPPING.CAR_OTHER
    } else {
      property = PROPERTY_MAPPING.NONE
    }

    // Housing based on income
    let housing: string
    if (income >= 6000) {
      housing = HOUSING_MAPPING.OWN
    } else if (income >= 3000) {
      housing = HOUSING_MAPPING.RENT
    } else {
      housing = HOUSING_MAPPING.FREE
    }

    // Existing credits - estimate based on age
    const existingCredits = age >= 30 ? 2 : 1

    // Job classification from livelihood
    const job = JOB_MAPPING[livelihood] || JOB_MAPPING['default']

    // People liable - default to 1
    const peopleLiable = 1

    return {
      status,
      duration,
      credit_history: creditHistory,
      purpose,
      credit_amount: loanAmount,
      savings,
      employment,
      installment_rate: installmentRate,
      personal_status_sex: personalStatusSex,
      other_debtors: OTHER_DEBTORS_DEFAULT,
      residence_since: residenceSince,
      property,
      age: age,
      other_installment_plans: OTHER_INSTALLMENT_DEFAULT,
      housing,
      existing_credits: existingCredits,
      job,
      people_liable: peopleLiable,
      telephone: TELEPHONE_DEFAULT,
      foreign_worker: FOREIGN_WORKER_DEFAULT
    }
  }

  /**
   * Calculate risk level from probability
   */
  private static calculateRiskLevel(probability: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' {
    if (probability >= 0.75) {
      return 'LOW'
    } else if (probability >= 0.5) {
      return 'MEDIUM'
    } else if (probability >= 0.25) {
      return 'HIGH'
    } else {
      return 'VERY_HIGH'
    }
  }

  /**
   * Run inference on the ONNX model
   */
  private static async runInference(breakdown: IScoreBreakdown): Promise<{ probability: number; creditworthy: boolean }> {
    if (!session) {
      throw new Error('ONNX model not loaded. Call ScoringService.initialize() first.')
    }

    // Build tensor feeds - each input must be a 2D tensor of shape [1, 1]
    const feeds: Record<string, ort.Tensor> = {}

    for (const [key, value] of Object.entries(breakdown)) {
      if (typeof value === 'number') {
        feeds[key] = new ort.Tensor('float32', [value], [1, 1])
      } else {
        feeds[key] = new ort.Tensor('string', [value], [1, 1])
      }
    }

    // Run inference
    const results = await session.run(feeds)

    // Find probability output dynamically
    const outputName = Object.keys(results).find(k => 
      k.toLowerCase().includes('prob')
    )

    if (!outputName) {
      throw new Error('Probability output not found in ONNX results')
    }

    const probabilities = results[outputName].data as Float32Array | number[]

    // Class 1 = Creditworthy (index 1)
    const probability = Number(probabilities[1])
    const creditworthy = probability >= 0.5

    return { probability, creditworthy }
  }

  /**
   * Score an application - main entry point
   */
  static async scoreApplication(
    application: IApplication,
    userContext: UserContext = {}
  ): Promise<ScoringResult> {
    // Generate mock data to fill model requirements
    const breakdown = this.generateMockData(application, userContext)

    try {
      // Run model inference
      const { probability, creditworthy } = await this.runInference(breakdown)
      const riskLevel = this.calculateRiskLevel(probability)

      return {
        probability,
        creditworthy,
        riskLevel,
        breakdown
      }
    } catch (error) {
      console.error('❌ Scoring inference failed:', error)
      
      // Return a conservative default score on failure
      // Don't crash - let the application continue
      return {
        probability: 0.5,
        creditworthy: false,
        riskLevel: 'HIGH',
        breakdown
      }
    }
  }

  /**
   * Score and save the result to database
   */
  static async scoreAndSave(
    application: IApplication,
    userContext: UserContext = {}
  ): Promise<typeof Score.prototype> {
    const result = await this.scoreApplication(application, userContext)

    // Create score record
    const score = await Score.create({
      applicationId: application._id,
      userId: application.userId,
      probability: result.probability,
      creditworthy: result.creditworthy,
      riskLevel: result.riskLevel,
      breakdown: result.breakdown,
      modelVersion: '1.0.0',
      scoredAt: new Date()
    })

    console.log(`📊 Scored application ${application._id}: ${result.creditworthy ? 'CREDITWORTHY' : 'NOT CREDITWORTHY'} (${(result.probability * 100).toFixed(1)}%)`)

    return score
  }

  /**
   * Get score for an application
   */
  static async getScoreByApplicationId(applicationId: string) {
    return await Score.findOne({ applicationId: new mongoose.Types.ObjectId(applicationId) })
  }

  /**
   * Get all scores for a user
   */
  static async getUserScores(userId: string) {
    return await Score.find({ userId }).sort({ scoredAt: -1 })
  }
}
