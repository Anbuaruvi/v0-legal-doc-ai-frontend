"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Check, X, Edit3, Download, FileText, AlertTriangle, CheckCircle, RefreshCw, Save } from "lucide-react"
import { cn } from "@/lib/utils"

interface RewriteSuggestion {
  id: string
  originalText: string
  suggestedText: string
  type: string
  riskLevel: "high" | "medium" | "low"
  page: number
  reasoning: string
  benefits: string[]
  status: "pending" | "accepted" | "rejected" | "edited"
  editedText?: string
}

const mockRewriteSuggestions: RewriteSuggestion[] = [
  {
    id: "1",
    originalText:
      "Client agrees to unlimited liability for any damages, including consequential damages, arising from breach of this Agreement.",
    suggestedText:
      "Client's liability for damages arising from breach of this Agreement shall be limited to the total amount paid under this Agreement in the twelve (12) months preceding the breach, excluding consequential damages.",
    type: "Liability",
    riskLevel: "high",
    page: 3,
    reasoning:
      "The original clause exposes the client to unlimited financial risk. The suggested revision caps liability at a reasonable amount and excludes unpredictable consequential damages.",
    benefits: [
      "Limits financial exposure to a predictable amount",
      "Excludes hard-to-calculate consequential damages",
      "Provides better risk management for the client",
    ],
    status: "pending",
  },
  {
    id: "2",
    originalText: "All intellectual property created under this Agreement shall belong exclusively to the Company.",
    suggestedText:
      "Intellectual property created under this Agreement shall be jointly owned by both parties, with each party retaining rights to their pre-existing intellectual property.",
    type: "Intellectual Property",
    riskLevel: "high",
    page: 2,
    reasoning:
      "The original clause gives the company complete ownership of all IP, even if built on the client's existing assets. Joint ownership provides fairer distribution of rights.",
    benefits: [
      "Protects client's pre-existing intellectual property",
      "Ensures fair sharing of newly created IP",
      "Allows both parties to benefit from innovations",
    ],
    status: "pending",
  },
  {
    id: "3",
    originalText:
      "Either party may terminate this Agreement at any time without cause by providing thirty (30) days written notice.",
    suggestedText:
      "Either party may terminate this Agreement without cause by providing sixty (60) days written notice, with the terminating party providing reasonable transition assistance.",
    type: "Termination",
    riskLevel: "medium",
    page: 2,
    reasoning:
      "Extending the notice period and requiring transition assistance provides more stability and smoother handovers when the agreement ends.",
    benefits: [
      "More time to find alternative arrangements",
      "Ensures proper knowledge transfer",
      "Reduces business disruption",
    ],
    status: "accepted",
  },
  {
    id: "4",
    originalText:
      "This Agreement shall be governed by the laws of Delaware, and any disputes shall be resolved through binding arbitration in Delaware.",
    suggestedText:
      "This Agreement shall be governed by the laws of [Client's State], and disputes shall first be addressed through mediation, with arbitration as a secondary option if mediation fails.",
    type: "Governing Law",
    riskLevel: "medium",
    page: 4,
    reasoning:
      "Using the client's local jurisdiction reduces travel costs and legal complexity. Adding mediation before arbitration provides more resolution options.",
    benefits: [
      "Reduces legal costs and travel requirements",
      "Provides more flexible dispute resolution options",
      "Uses familiar local legal framework",
    ],
    status: "pending",
  },
]

export function DocumentRewriting() {
  const [suggestions, setSuggestions] = useState<RewriteSuggestion[]>(mockRewriteSuggestions)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [isGeneratingRevision, setIsGeneratingRevision] = useState(false)
  const [revisionProgress, setRevisionProgress] = useState(0)

  const handleSuggestionAction = (id: string, action: "accept" | "reject" | "edit") => {
    setSuggestions((prev) =>
      prev.map((suggestion) => {
        if (suggestion.id === id) {
          if (action === "edit") {
            setEditingId(id)
            setEditText(suggestion.suggestedText)
            return suggestion
          }
          return { ...suggestion, status: action === "accept" ? "accepted" : "rejected" }
        }
        return suggestion
      }),
    )
  }

  const handleSaveEdit = (id: string) => {
    setSuggestions((prev) =>
      prev.map((suggestion) => {
        if (suggestion.id === id) {
          return {
            ...suggestion,
            status: "edited",
            editedText: editText,
          }
        }
        return suggestion
      }),
    )
    setEditingId(null)
    setEditText("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  const handleApplyAllSafe = () => {
    setSuggestions((prev) =>
      prev.map((suggestion) => ({
        ...suggestion,
        status: suggestion.status === "pending" ? "accepted" : suggestion.status,
      })),
    )
  }

  const handleGenerateRevision = async () => {
    setIsGeneratingRevision(true)
    setRevisionProgress(0)

    // Mock progress
    const steps = [20, 40, 60, 80, 100]
    for (const progress of steps) {
      setRevisionProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Mock download
    const acceptedSuggestions = suggestions.filter((s) => s.status === "accepted" || s.status === "edited")
    const revisionContent = `REVISED LEGAL DOCUMENT\n\nThe following clauses have been updated based on AI recommendations:\n\n${acceptedSuggestions
      .map((s, i) => `${i + 1}. ${s.type} (Page ${s.page})\nRevised Text: ${s.editedText || s.suggestedText}\n`)
      .join("\n")}`

    const element = document.createElement("a")
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(revisionContent)}`
    element.download = "revised-contract.txt"
    element.click()

    setIsGeneratingRevision(false)
    setRevisionProgress(0)
  }

  const pendingSuggestions = suggestions.filter((s) => s.status === "pending")
  const acceptedSuggestions = suggestions.filter((s) => s.status === "accepted" || s.status === "edited")
  const rejectedSuggestions = suggestions.filter((s) => s.status === "rejected")

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-success bg-success/10 border-success/20"
      case "rejected":
        return "text-destructive bg-destructive/10 border-destructive/20"
      case "edited":
        return "text-primary bg-primary/10 border-primary/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  if (isGeneratingRevision) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Generating Revised Document</h2>
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Creating Revised Contract</h3>
                <p className="text-muted-foreground">Applying accepted suggestions and generating new document...</p>
              </div>
              <div className="w-full max-w-md mx-auto">
                <Progress value={revisionProgress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">{revisionProgress}% complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Document Rewriting Suggestions</h2>
        <p className="text-muted-foreground">
          AI-powered suggestions to improve risky clauses and create a safer contract
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Suggestions</CardTitle>
            <Edit3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{suggestions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingSuggestions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{acceptedSuggestions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Actions</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              size="sm"
              onClick={handleApplyAllSafe}
              disabled={pendingSuggestions.length === 0}
              className="w-full"
            >
              Accept All
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Generate Revised Document Button */}
      {acceptedSuggestions.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Ready to Generate Revised Document</h3>
                <p className="text-sm text-muted-foreground">
                  {acceptedSuggestions.length} suggestion{acceptedSuggestions.length !== 1 ? "s" : ""} will be applied
                  to create a safer contract
                </p>
              </div>
              <Button onClick={handleGenerateRevision} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Generate Revised Contract</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rewrite Suggestions */}
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {suggestion.type}
                  </Badge>
                  <Badge className={cn("text-xs", getRiskColor(suggestion.riskLevel))}>
                    {suggestion.riskLevel.charAt(0).toUpperCase() + suggestion.riskLevel.slice(1)} Risk
                  </Badge>
                  <Badge className={cn("text-xs", getStatusColor(suggestion.status))}>
                    {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Page {suggestion.page}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Original Text */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Original Clause</h4>
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-foreground leading-relaxed">{suggestion.originalText}</p>
                </div>
              </div>

              {/* Suggested/Edited Text */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">
                  {editingId === suggestion.id ? "Edit Suggestion" : "Suggested Revision"}
                </h4>
                {editingId === suggestion.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="min-h-24"
                      placeholder="Edit the suggested text..."
                    />
                    <div className="flex items-center space-x-2">
                      <Button size="sm" onClick={() => handleSaveEdit(suggestion.id)}>
                        <Save className="h-3 w-3 mr-1" />
                        Save Changes
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                    <p className="text-sm text-foreground leading-relaxed">
                      {suggestion.editedText || suggestion.suggestedText}
                    </p>
                  </div>
                )}
              </div>

              {/* Reasoning and Benefits */}
              {editingId !== suggestion.id && (
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Why This Change?</h5>
                    <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Benefits</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {suggestion.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {suggestion.status === "pending" && editingId !== suggestion.id && (
                <div className="flex items-center space-x-2 pt-2 border-t border-border">
                  <Button size="sm" onClick={() => handleSuggestionAction(suggestion.id, "accept")}>
                    <Check className="h-3 w-3 mr-1" />
                    Accept
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleSuggestionAction(suggestion.id, "edit")}>
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleSuggestionAction(suggestion.id, "reject")}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
