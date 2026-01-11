"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Globe, ChevronRight, ChevronLeft } from "lucide-react"

type FormDataType = {
  age: string; gender: string; foreignWorker: string; checkingStatus: string; 
  creditHistory: string; purpose: string; creditAmount: string; duration: string; 
  savingsAccount: string; employment: string; installmentRate: string; 
  otherDebtors: string; residenceSince: string; property: string;
  otherInstallments: string; housing: string; existingCredits: string; 
  job: string; peopleLiable: string; telephone: string;
}

type OptionType = string | { value: string; label: string }

export default function CreditApplicationForm() {
  const router = useRouter()
  const [language, setLanguage] = useState("en")
  const [step, setStep] = useState(0)
  const [showConsent, setShowConsent] = useState(false)
  const [formData, setFormData] = useState<FormDataType>({
    age: "", gender: "", foreignWorker: "", checkingStatus: "", creditHistory: "",
    purpose: "", creditAmount: "", duration: "", savingsAccount: "", employment: "",
    installmentRate: "", otherDebtors: "", residenceSince: "", property: "",
    otherInstallments: "", housing: "", existingCredits: "", job: "", peopleLiable: "", telephone: ""
  })

  const t = language === "en" ? {
    title: "Credit Application", desc: "Provide details for credit assessment",
    personal: "Personal Info", financial: "Financial Info", loan: "Loan Details",
    age: "Age", gender: "Gender", male: "Male", female: "Female", foreignWorker: "Foreign Worker",
    yes: "Yes", no: "No", checkingStatus: "Checking Account Status",
    checking: ["No account", "< 0 DM", "0-200 DM", "> 200 DM"],
    creditHistory: "Credit History",
    history: ["All paid", "Existing paid", "Delayed", "Critical", "None/All paid"],
    purpose: "Loan Purpose",
    purposes: ["New car", "Used car", "Furniture", "Radio/TV", "Appliances", "Repairs", "Education", "Business", "Other"],
    creditAmount: "Credit Amount (DM)", duration: "Duration (months)",
    savingsAccount: "Savings Balance",
    savings: ["< 100 DM", "100-500 DM", "500-1000 DM", "> 1000 DM", "Unknown"],
    employment: "Employment Duration",
    employments: ["Unemployed", "< 1 year", "1-4 years", "4-7 years", "> 7 years"],
    installmentRate: "Installment Rate (%)", otherDebtors: "Other Debtors",
    debtors: ["None", "Co-applicant", "Guarantor"], residenceSince: "Residence (years)",
    property: "Property", properties: ["Real estate", "Savings/Insurance", "Car/Other", "None"],
    otherInstallments: "Other Installments", installments: ["Bank", "Stores", "None"],
    housing: "Housing", housings: ["Rent", "Own", "Free"], existingCredits: "Existing Credits",
    job: "Job Category", jobs: ["Unemployed", "Unskilled", "Skilled", "Management"],
    peopleLiable: "People Liable", telephone: "Telephone", select: "Select option",
    next: "Next", prev: "Previous", submit: "Submit",
    consentTitle: "Terms and Conditions",
    consentText1: "I hereby consent to the processing of my personal and financial data for the purpose of credit assessment and loan approval.",
    consentText2: "Your data will be securely stored and processed in compliance with applicable data protection laws.",
    consentText3: "By proceeding, you agree to our Privacy Policy and Terms of Service.",
    agree: "I Agree"
  } : {
    title: "क्रेडिट आवेदन", desc: "ऋण मूल्यांकन के लिए विवरण प्रदान करें",
    personal: "व्यक्तिगत जानकारी", financial: "वित्तीय जानकारी", loan: "ऋण विवरण",
    age: "आयु", gender: "लिंग", male: "पुरुष", female: "महिला", foreignWorker: "विदेशी कार्यकर्ता",
    yes: "हाँ", no: "नहीं", checkingStatus: "चेकिंग खाता स्थिति",
    checking: ["कोई खाता नहीं", "< 0 DM", "0-200 DM", "> 200 DM"],
    creditHistory: "ऋण इतिहास",
    history: ["सभी चुकाए", "मौजूदा चुकाए", "विलंबित", "गंभीर", "कोई नहीं/सभी चुकाए"],
    purpose: "ऋण उद्देश्य",
    purposes: ["नई कार", "पुरानी कार", "फर्नीचर", "रेडियो/टीवी", "उपकरण", "मरम्मत", "शिक्षा", "व्यवसाय", "अन्य"],
    creditAmount: "ऋण राशि (DM)", duration: "अवधि (महीने)",
    savingsAccount: "बचत शेष",
    savings: ["< 100 DM", "100-500 DM", "500-1000 DM", "> 1000 DM", "अज्ञात"],
    employment: "रोजगार अवधि",
    employments: ["बेरोजगार", "< 1 वर्ष", "1-4 वर्ष", "4-7 वर्ष", "> 7 वर्ष"],
    installmentRate: "किश्त दर (%)", otherDebtors: "अन्य देनदार",
    debtors: ["कोई नहीं", "सह-आवेदक", "गारंटर"], residenceSince: "निवास (वर्ष)",
    property: "संपत्ति", properties: ["अचल संपत्ति", "बचत/बीमा", "कार/अन्य", "कोई नहीं"],
    otherInstallments: "अन्य किश्तें", installments: ["बैंक", "दुकानें", "कोई नहीं"],
    housing: "आवास", housings: ["किराया", "स्वयं", "मुफ्त"], existingCredits: "मौजूदा ऋण",
    job: "नौकरी श्रेणी", jobs: ["बेरोजगार", "अकुशल", "कुशल", "प्रबंधन"],
    peopleLiable: "उत्तरदायी लोग", telephone: "टेलीफोन", select: "विकल्प चुनें",
    next: "अगला", prev: "पिछला", submit: "जमा करें",
    consentTitle: "नियम और शर्तें",
    consentText1: "मैं ऋण मूल्यांकन और स्वीकृति के उद्देश्य से अपने व्यक्तिगत और वित्तीय डेटा के प्रसंस्करण की सहमति देता हूं।",
    consentText2: "आपका डेटा सुरक्षित रूप से संग्रहीत और लोन एप्लिकेशन प्रक्रिया के अनुसार संसाधित किया जाएगा।",
    consentText3: "आगे बढ़कर आप हमारी गोपनीयता नीति और सेवा की शर्तों से सहमति व्यक्त करते हैं।",
    agree: "मैं सहमत हूं"
  }

  const Field = ({ label, name, type = "text", options = [] }: {
    label: string
    name: keyof FormDataType
    type?: string
    options?: OptionType[]
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      {options.length > 0 ? (
        <select
          value={formData[name]}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
          required
          className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t.select}</option>
          {options.map((opt, i) => {
            const value = typeof opt === 'string' ? opt : opt.value
            const label = typeof opt === 'string' ? opt : opt.label
            return <option key={i} value={value}>{label}</option>
          })}
        </select>
      ) : (
        <input
          type={type}
          value={formData[name]}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
          required
          min={type === "number" ? "1" : undefined}
          className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  )

  const steps = [
    {
      title: t.personal,
      fields: [
        <Field key="age" label={t.age} name="age" type="number" />,
        <Field key="gender" label={t.gender} name="gender" options={[
          { value: "male", label: t.male },
          { value: "female", label: t.female }
        ]} />,
        <Field key="foreignWorker" label={t.foreignWorker} name="foreignWorker" options={[
          { value: "yes", label: t.yes },
          { value: "no", label: t.no }
        ]} />,
        <Field key="residenceSince" label={t.residenceSince} name="residenceSince" type="number" />,
        <Field key="peopleLiable" label={t.peopleLiable} name="peopleLiable" type="number" />,
        <Field key="telephone" label={t.telephone} name="telephone" options={[
          { value: "yes", label: t.yes },
          { value: "no", label: t.no }
        ]} />
      ]
    },
    {
      title: t.financial,
      fields: [
        <Field key="checkingStatus" label={t.checkingStatus} name="checkingStatus" options={t.checking} />,
        <Field key="savingsAccount" label={t.savingsAccount} name="savingsAccount" options={t.savings} />,
        <Field key="employment" label={t.employment} name="employment" options={t.employments} />,
        <Field key="job" label={t.job} name="job" options={t.jobs} />,
        <Field key="property" label={t.property} name="property" options={t.properties} />,
        <Field key="housing" label={t.housing} name="housing" options={t.housings} />,
        <Field key="existingCredits" label={t.existingCredits} name="existingCredits" type="number" />
      ]
    },
    {
      title: t.loan,
      fields: [
        <Field key="creditHistory" label={t.creditHistory} name="creditHistory" options={t.history} />,
        <Field key="purpose" label={t.purpose} name="purpose" options={t.purposes} />,
        <Field key="creditAmount" label={t.creditAmount} name="creditAmount" type="number" />,
        <Field key="duration" label={t.duration} name="duration" type="number" />,
        <Field key="installmentRate" label={t.installmentRate} name="installmentRate" type="number" />,
        <Field key="otherDebtors" label={t.otherDebtors} name="otherDebtors" options={t.debtors} />,
        <Field key="otherInstallments" label={t.otherInstallments} name="otherInstallments" options={t.installments} />
      ]
    }
  ]

  const handleSubmit = () => {
    setShowConsent(true)
    console.log(formData)
  }

  const handleConsentSubmit = () => {
    console.log("Final submission:", { ...formData, consentGiven: true })
    // Redirect to dashboard after successful submission
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">{t.title}</h1>
            <p className="text-slate-400 mt-1">{t.desc}</p>
          </div>
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            <Globe className="h-4 w-4 text-slate-300" />
            <span className="text-sm font-medium text-slate-300">{language === "en" ? "हिन्दी" : "English"}</span>
          </button>
        </div>

        {!showConsent && (
          <div className="mb-8">
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-blue-500' : 'bg-slate-700'}`} />
                  {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-slate-400 mx-2" />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {steps.map((s, i) => (
                <span key={i} className={`text-sm font-medium ${i === step ? 'text-blue-400' : 'text-slate-500'}`}>
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-8">
          {!showConsent ? (
            <>
              <h2 className="text-xl font-bold text-slate-100 mb-6">{steps[step].title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {steps[step].fields}
              </div>

              <div className="flex gap-3 mt-8">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-6 py-3 border border-slate-600 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t.prev}
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    {t.next}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                  >
                    {t.submit}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full">
              <h3 className="text-lg font-bold text-slate-100 mb-4">{t.consentTitle}</h3>
              <div className="mb-6 max-h-60 overflow-y-auto p-4 bg-slate-900 rounded-lg border border-slate-600">
                <p className="text-sm text-slate-300 mb-3">{t.consentText1}</p>
                <p className="text-sm text-slate-300 mb-3">{t.consentText2}</p>
                <p className="text-sm text-slate-300">{t.consentText3}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConsent(false)}
                  className="px-6 py-3 border border-slate-600 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                >
                  {t.prev}
                </button>
                <button
                  onClick={handleConsentSubmit}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                >
                  {t.agree}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}