"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileBarChart,
  Download,
  Eye,
  AlertTriangle,
  Shield,
  Clock,
  FileText,
  Target,
  TrendingUp,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SummarySection {
  title: string
  content: string
  keyPoints: string[]
  riskLevel: "high" | "medium" | "low"
  page: number
}

const mockSummary: SummarySection[] = [
  {
    title: "Service Agreement Overview",
    content:
      "This is a comprehensive service agreement between the Company and Client for professional consulting services. The agreement establishes the framework for ongoing collaboration with specific deliverables and timelines.",
    keyPoints: [
      "Professional consulting services contract",
      "12-month initial term with renewal options",
      "Defined scope of work and deliverables",
    ],
    riskLevel: "low",
    page: 1,
  },
  {
    title: "Payment Terms & Financial Obligations",
    content:
      "Payment structure includes monthly retainer fees with additional project-based billing. Net 30 payment terms with late payment penalties. Total contract value estimated at $240,000 annually.",
    keyPoints: [
      "$20,000 monthly retainer fee",
      "Net 30 payment terms",
      "1.5% monthly late payment penalty",
      "Additional project billing at $150/hour",
    ],
    riskLevel: "medium",
    page: 1,
  },
  {
    title: "Liability & Risk Allocation",
    content:
      "The contract contains several high-risk liability clauses that heavily favor the Company. Client assumes unlimited liability for breaches, including consequential damages, which could result in significant financial exposure.",
    keyPoints: [
      "Unlimited client liability for damages",
      "Includes consequential damages",
      "No liability caps or limitations",
      "Company indemnification is limited",
    ],
    riskLevel: "high",
    page: 3,
  },
  {
    title: "Intellectual Property Rights",
    content:
      "All intellectual property created during the engagement becomes exclusive property of the Company, including work built on Client's existing IP. This represents a significant transfer of value and future rights.",
    keyPoints: [
      "All new IP belongs to Company",
      "Client loses rights to work product",
      "No protection for Client's existing IP",
      "No revenue sharing for IP commercialization",
    ],
    riskLevel: "high",
    page: 2,
  },
  {
    title: "Termination & Transition",
    content:
      "Either party may terminate with 30 days notice. Termination provisions are relatively standard but could benefit from longer notice periods and more detailed transition requirements.",
    keyPoints: [
      "30-day termination notice required",
      "No cause required for termination",
      "Limited transition assistance specified",
      "Immediate cessation of services upon notice",
    ],
    riskLevel: "medium",
    page: 2,
  },
]

interface ConfidenceMetric {
  category: string
  score: number
  description: string
  factors: string[]
  icon: any
}

const confidenceMetrics: ConfidenceMetric[] = [
  {
    category: "Clause Coverage",
    score: 92,
    description: "Percentage of document content successfully identified and classified",
    factors: [
      "24 of 26 clauses detected",
      "High confidence in clause boundaries",
      "Standard legal language patterns recognized",
    ],
    icon: FileText,
  },
  {
    category: "Risk Assessment Accuracy",
    score: 87,
    description: "Reliability of risk level classifications and threat identification",
    factors: [
      "Cross-referenced with legal precedents",
      "Validated against industry standards",
      "High-risk patterns clearly identified",
    ],
    icon: Target,
  },
  {
    category: "Language Processing",
    score: 94,
    description: "Quality of text analysis and semantic understanding",
    factors: [
      "Clear document structure detected",
      "Legal terminology properly parsed",
      "Context relationships identified",
    ],
    icon: TrendingUp,
  },
  {
    category: "Completeness",
    score: 78,
    description: "Coverage of all document sections and potential edge cases",
    factors: [
      "Some complex nested clauses may need review",
      "Appendices and schedules partially analyzed",
      "Cross-references mostly resolved",
    ],
    icon: Info,
  },
]

export function ContractSummarization() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [showConfidenceDetails, setShowConfidenceDetails] = useState(false)

  const overallConfidence = Math.round(
    confidenceMetrics.reduce((sum, metric) => sum + metric.score, 0) / confidenceMetrics.length,
  )

  const riskSummary = {
    high: mockSummary.filter((s) => s.riskLevel === "high").length,
    medium: mockSummary.filter((s) => s.riskLevel === "medium").length,
    low: mockSummary.filter((s) => s.riskLevel === "low").length,
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "text-destructive bg-destructive/10 border-destructive/20"
      case "medium":
        return "text-warning bg-warning/10 border-warning/20"
      case "low":
        return "text-success bg-success/10 border-success/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return AlertTriangle
      case "medium":
        return Clock
      case "low":
        return Shield
      default:
        return Info
    }
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return "text-success"
    if (score >= 75) return "text-warning"
    return "text-destructive"
  }

  const handleDownloadSummary = () => {
    const summaryContent = `LEGAL DOCUMENT EXECUTIVE SUMMARY\n\n${mockSummary
      .map(
        (section, i) =>
          `${i + 1}. ${section.title}\n${section.content}\n\nKey Points:\n${section.keyPoints.map((point) => `• ${point}`).join("\n")}\n\n`,
      )
      .join("")}Overall Confidence Score: ${overallConfidence}%`

    const element = document.createElement("a")
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(summaryContent)}`
    element.download = "contract-summary.txt"
    element.click()
  }

  const handleDownloadFullReport = () => {
    const reportContent = `COMPREHENSIVE LEGAL ANALYSIS REPORT\n\nCONFIDENCE METRICS:\n${confidenceMetrics
      .map(
        (metric) =>
          `${metric.category}: ${metric.score}%\n${metric.description}\nFactors:\n${metric.factors.map((f) => `• ${f}`).join("\n")}\n\n`,
      )
      .join("")}EXECUTIVE SUMMARY:\n${mockSummary
      .map(
        (section, i) => `${i + 1}. ${section.title} (${section.riskLevel.toUpperCase()} RISK)\n${section.content}\n\n`,
      )
      .join("")}`

    const element = document.createElement("a")
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(reportContent)}`
    element.download = "full-legal-analysis-report.txt"
    element.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Contract Summarization & Confidence Analysis</h2>
        <p className="text-muted-foreground">Executive summary of key contract terms with AI confidence metrics</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Confidence</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", getConfidenceColor(overallConfidence))}>{overallConfidence}%</div>
            <Progress value={overallConfidence} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Summary Sections</CardTitle>
            <FileBarChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockSummary.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risk Areas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{riskSummary.high}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Actions</CardTitle>
            <Download className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Button size="sm" onClick={handleDownloadSummary} className="w-full">
              Download Summary
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Confidence Score Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Legal Confidence Score Breakdown</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowConfidenceDetails(!showConfidenceDetails)}>
              {showConfidenceDetails ? "Hide Details" : "Show Details"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {confidenceMetrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div key={metric.category} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{metric.category}</span>
                    </div>
                    <span className={cn("font-bold", getConfidenceColor(metric.score))}>{metric.score}%</span>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                  {showConfidenceDetails && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {metric.factors.map((factor, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-primary">•</span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileBarChart className="h-5 w-5" />
              <span>Executive Summary</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleDownloadFullReport}>
              <Download className="h-4 w-4 mr-2" />
              Full Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSummary.map((section, index) => {
              const RiskIcon = getRiskIcon(section.riskLevel)
              const isSelected = selectedSection === section.title

              return (
                <Card
                  key={section.title}
                  className={cn(
                    "cursor-pointer transition-colors border-l-4",
                    section.riskLevel === "high"
                      ? "border-l-destructive"
                      : section.riskLevel === "medium"
                        ? "border-l-warning"
                        : "border-l-success",
                    isSelected ? "bg-muted/30" : "hover:bg-muted/20",
                  )}
                  onClick={() => setSelectedSection(isSelected ? null : section.title)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <RiskIcon
                          className={cn(
                            "h-5 w-5 mt-0.5",
                            section.riskLevel === "high"
                              ? "text-destructive"
                              : section.riskLevel === "medium"
                                ? "text-warning"
                                : "text-success",
                          )}
                        />
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-foreground">{section.title}</h3>
                            <Badge className={cn("text-xs", getRiskColor(section.riskLevel))}>
                              {section.riskLevel.charAt(0).toUpperCase() + section.riskLevel.slice(1)} Risk
                            </Badge>
                            <span className="text-xs text-muted-foreground">Page {section.page}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                        </div>
                      </div>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>

                  {isSelected && (
                    <CardContent className="pt-0">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">Key Points</h4>
                        <ul className="space-y-1">
                          {section.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
