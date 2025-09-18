"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Shield, AlertCircle, Download, Edit3, Info, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface RiskClause {
  id: string
  text: string
  type: string
  riskLevel: "high" | "medium" | "safe"
  riskScore: number
  explanation: string
  recommendations: string[]
  page: number
  impact: string
}

const mockRiskClauses: RiskClause[] = [
  {
    id: "1",
    text: "Client agrees to unlimited liability for any damages, including consequential damages, arising from breach of this Agreement.",
    type: "Liability",
    riskLevel: "high",
    riskScore: 95,
    explanation:
      "This clause exposes the client to unlimited financial liability, including consequential damages which can be extremely costly and unpredictable.",
    recommendations: [
      "Cap liability to a specific dollar amount",
      "Exclude consequential damages",
      "Add mutual liability limitations",
    ],
    page: 3,
    impact: "Financial exposure could be catastrophic",
  },
  {
    id: "2",
    text: "All intellectual property created under this Agreement shall belong exclusively to the Company.",
    type: "Intellectual Property",
    riskLevel: "high",
    riskScore: 88,
    explanation:
      "Client loses all rights to work product and innovations, even those built on client's existing IP or created with client resources.",
    recommendations: [
      "Negotiate shared IP ownership",
      "Retain rights to pre-existing IP",
      "Include work-for-hire provisions for client-funded development",
    ],
    page: 2,
    impact: "Loss of valuable intellectual property rights",
  },
  {
    id: "3",
    text: "Either party may terminate this Agreement at any time without cause by providing thirty (30) days written notice.",
    type: "Termination",
    riskLevel: "medium",
    riskScore: 65,
    explanation:
      "While termination flexibility can be beneficial, 30 days may not provide sufficient time to transition services or find alternatives.",
    recommendations: [
      "Extend notice period to 60-90 days",
      "Add termination for convenience vs. cause distinctions",
      "Include transition assistance requirements",
    ],
    page: 2,
    impact: "Potential service disruption with limited transition time",
  },
  {
    id: "4",
    text: "This Agreement shall be governed by the laws of Delaware, and any disputes shall be resolved through binding arbitration in Delaware.",
    type: "Governing Law",
    riskLevel: "medium",
    riskScore: 45,
    explanation:
      "Dispute resolution in Delaware may be inconvenient and costly if client is located elsewhere. Binding arbitration limits legal recourse options.",
    recommendations: [
      "Negotiate jurisdiction closer to client's location",
      "Consider mediation before arbitration",
      "Allow for court proceedings for certain types of disputes",
    ],
    page: 4,
    impact: "Increased legal costs and limited dispute resolution options",
  },
  {
    id: "5",
    text: "The Company shall indemnify and hold harmless the Client from any claims arising from the performance of this Agreement.",
    type: "Indemnification",
    riskLevel: "safe",
    riskScore: 15,
    explanation:
      "This clause protects the client by requiring the company to cover legal costs and damages from third-party claims related to the company's performance.",
    recommendations: [
      "Ensure indemnification covers all relevant scenarios",
      "Consider mutual indemnification for certain situations",
    ],
    page: 1,
    impact: "Good protection for client against third-party claims",
  },
]

export function RiskAssessment() {
  const [expandedClauses, setExpandedClauses] = useState<Set<string>>(new Set())
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>("all")

  const toggleClauseExpansion = (clauseId: string) => {
    const newExpanded = new Set(expandedClauses)
    if (newExpanded.has(clauseId)) {
      newExpanded.delete(clauseId)
    } else {
      newExpanded.add(clauseId)
    }
    setExpandedClauses(newExpanded)
  }

  const filteredClauses = mockRiskClauses.filter(
    (clause) => selectedRiskLevel === "all" || clause.riskLevel === selectedRiskLevel,
  )

  const riskSummary = {
    high: mockRiskClauses.filter((c) => c.riskLevel === "high").length,
    medium: mockRiskClauses.filter((c) => c.riskLevel === "medium").length,
    safe: mockRiskClauses.filter((c) => c.riskLevel === "safe").length,
  }

  const overallRiskScore = Math.round(
    mockRiskClauses.reduce((sum, clause) => sum + clause.riskScore, 0) / mockRiskClauses.length,
  )

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return AlertTriangle
      case "medium":
        return AlertCircle
      case "safe":
        return Shield
      default:
        return Info
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "text-destructive bg-destructive/10 border-destructive/20"
      case "medium":
        return "text-warning bg-warning/10 border-warning/20"
      case "safe":
        return "text-success bg-success/10 border-success/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getRiskBgColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-destructive/5 border-destructive/20"
      case "medium":
        return "bg-warning/5 border-warning/20"
      case "safe":
        return "bg-success/5 border-success/20"
      default:
        return "bg-muted/5"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Risk Assessment & Flagging</h2>
        <p className="text-muted-foreground">
          Detailed analysis of potentially risky clauses with explanations and recommendations
        </p>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{overallRiskScore}%</div>
            <Progress value={overallRiskScore} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{riskSummary.high}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Medium Risk</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{riskSummary.medium}</div>
            <p className="text-xs text-muted-foreground">Should be reviewed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Safe Clauses</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{riskSummary.safe}</div>
            <p className="text-xs text-muted-foreground">Low risk or protective</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedRiskLevel === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedRiskLevel("all")}
        >
          All Clauses ({mockRiskClauses.length})
        </Button>
        <Button
          variant={selectedRiskLevel === "high" ? "destructive" : "outline"}
          size="sm"
          onClick={() => setSelectedRiskLevel("high")}
        >
          <AlertTriangle className="h-3 w-3 mr-1" />
          High Risk ({riskSummary.high})
        </Button>
        <Button
          variant={selectedRiskLevel === "medium" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedRiskLevel("medium")}
          className={selectedRiskLevel === "medium" ? "bg-warning text-warning-foreground hover:bg-warning/90" : ""}
        >
          <AlertCircle className="h-3 w-3 mr-1" />
          Medium Risk ({riskSummary.medium})
        </Button>
        <Button
          variant={selectedRiskLevel === "safe" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedRiskLevel("safe")}
          className={selectedRiskLevel === "safe" ? "bg-success text-success-foreground hover:bg-success/90" : ""}
        >
          <Shield className="h-3 w-3 mr-1" />
          Safe ({riskSummary.safe})
        </Button>
      </div>

      {/* Risk Clauses */}
      <div className="space-y-4">
        {filteredClauses.map((clause) => {
          const RiskIcon = getRiskIcon(clause.riskLevel)
          const isExpanded = expandedClauses.has(clause.id)

          return (
            <Card key={clause.id} className={cn("border-l-4", getRiskBgColor(clause.riskLevel))}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <RiskIcon
                      className={cn(
                        "h-5 w-5 mt-0.5",
                        clause.riskLevel === "high"
                          ? "text-destructive"
                          : clause.riskLevel === "medium"
                            ? "text-warning"
                            : "text-success",
                      )}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {clause.type}
                        </Badge>
                        <Badge className={cn("text-xs", getRiskColor(clause.riskLevel))}>
                          {clause.riskLevel.charAt(0).toUpperCase() + clause.riskLevel.slice(1)} Risk
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Page {clause.page} • Risk Score: {clause.riskScore}%
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{clause.text}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleClauseExpansion(clause.id)}>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Risk Explanation</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{clause.explanation}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Potential Impact</h4>
                      <p className="text-sm text-muted-foreground">{clause.impact}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Recommendations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {clause.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2 border-t border-border">
                    <Button variant="outline" size="sm">
                      <Edit3 className="h-3 w-3 mr-1" />
                      Rewrite Clause
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download Analysis
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {filteredClauses.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No {selectedRiskLevel === "all" ? "" : selectedRiskLevel + " risk "}clauses found
            </h3>
            <p className="text-muted-foreground">
              {selectedRiskLevel === "all"
                ? "No clauses have been analyzed yet."
                : `There are no ${selectedRiskLevel} risk clauses in this document.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
