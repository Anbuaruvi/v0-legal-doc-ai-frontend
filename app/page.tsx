"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { UploadWidget } from "@/components/upload-widget"
import { DashboardSummary } from "@/components/dashboard-summary"
import { ClauseDetection } from "@/components/clause-detection"
import { RiskAssessment } from "@/components/risk-assessment"
import { PlainEnglishTranslation } from "@/components/plain-english-translation"
import { DocumentRewriting } from "@/components/document-rewriting"
import { ContractSummarization } from "@/components/contract-summarization"

export default function LegalDocAI() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState("")
  const [processingProgress, setProcessingProgress] = useState(0)

  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState({
    totalClauses: 0,
    riskyClauses: 0,
    safeClauses: 0,
    confidenceScore: 0,
  })

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsProcessing(true)

    // Mock processing steps
    const steps = [
      { step: "Parsing document...", progress: 20 },
      { step: "Extracting clauses...", progress: 40 },
      { step: "Classifying content...", progress: 60 },
      { step: "Analyzing risks...", progress: 80 },
      { step: "Generating insights...", progress: 100 },
    ]

    for (const { step, progress } of steps) {
      setProcessingStep(step)
      setProcessingProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // Mock results
    setAnalysisResults({
      totalClauses: 24,
      riskyClauses: 6,
      safeClauses: 18,
      confidenceScore: 87,
    })

    setIsProcessing(false)
  }

  const handleViewDetails = (section: string) => {
    setActiveTab(section)
  }

  const showResults = uploadedFile && !isProcessing

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-6 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground text-balance">Legal Document Analysis Platform</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Upload your legal documents for AI-powered clause detection, risk assessment, and plain English
                translation
              </p>
            </div>

            <UploadWidget
              onFileUpload={handleFileUpload}
              isProcessing={isProcessing}
              processingStep={processingStep}
              processingProgress={processingProgress}
            />

            {showResults && (
              <DashboardSummary
                totalClauses={analysisResults.totalClauses}
                riskyClauses={analysisResults.riskyClauses}
                safeClauses={analysisResults.safeClauses}
                confidenceScore={analysisResults.confidenceScore}
                onViewDetails={handleViewDetails}
              />
            )}
          </div>
        )}

        {activeTab === "clause-detection" && showResults && <ClauseDetection />}

        {activeTab === "risk-flags" && showResults && <RiskAssessment />}

        {activeTab === "plain-english" && showResults && <PlainEnglishTranslation />}

        {activeTab === "rewrite" && showResults && <DocumentRewriting />}

        {(activeTab === "summarization" || activeTab === "confidence") && showResults && <ContractSummarization />}

        {activeTab !== "dashboard" &&
          activeTab !== "clause-detection" &&
          activeTab !== "risk-flags" &&
          activeTab !== "plain-english" &&
          activeTab !== "rewrite" &&
          activeTab !== "summarization" &&
          activeTab !== "confidence" && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {activeTab
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
                Feature
              </h2>
              <p className="text-muted-foreground">This feature will be implemented in the next steps.</p>
            </div>
          )}

        {(activeTab === "clause-detection" ||
          activeTab === "risk-flags" ||
          activeTab === "plain-english" ||
          activeTab === "rewrite" ||
          activeTab === "summarization" ||
          activeTab === "confidence") &&
          !showResults && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">No Document Uploaded</h2>
              <p className="text-muted-foreground mb-6">
                Please upload a legal document from the dashboard to view analysis results.
              </p>
              <button onClick={() => setActiveTab("dashboard")} className="text-primary hover:underline">
                Go to Dashboard
              </button>
            </div>
          )}
      </main>
    </div>
  )
}
