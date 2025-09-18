"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Download, Eye, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface Clause {
  id: string
  text: string
  type: string
  confidence: number
  page: number
  riskLevel: "safe" | "medium" | "high"
}

const mockClauses: Clause[] = [
  {
    id: "1",
    text: "The Company shall indemnify and hold harmless the Client from any claims arising from the performance of this Agreement.",
    type: "Indemnification",
    confidence: 95,
    page: 1,
    riskLevel: "safe",
  },
  {
    id: "2",
    text: "Either party may terminate this Agreement at any time without cause by providing thirty (30) days written notice.",
    type: "Termination",
    confidence: 92,
    page: 2,
    riskLevel: "medium",
  },
  {
    id: "3",
    text: "Client agrees to unlimited liability for any damages, including consequential damages, arising from breach of this Agreement.",
    type: "Liability",
    confidence: 98,
    page: 3,
    riskLevel: "high",
  },
  {
    id: "4",
    text: "All intellectual property created under this Agreement shall belong exclusively to the Company.",
    type: "Intellectual Property",
    confidence: 89,
    page: 2,
    riskLevel: "high",
  },
  {
    id: "5",
    text: "Payment terms are Net 30 days from invoice date.",
    type: "Payment Terms",
    confidence: 99,
    page: 1,
    riskLevel: "safe",
  },
  {
    id: "6",
    text: "This Agreement shall be governed by the laws of Delaware.",
    type: "Governing Law",
    confidence: 94,
    page: 4,
    riskLevel: "safe",
  },
]

const clauseTypes = [
  "All Types",
  "Indemnification",
  "Termination",
  "Liability",
  "Intellectual Property",
  "Payment Terms",
  "Governing Law",
]
const riskLevels = ["All Levels", "safe", "medium", "high"]

export function ClauseDetection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedRisk, setSelectedRisk] = useState("All Levels")
  const [selectedClause, setSelectedClause] = useState<string | null>(null)

  const filteredClauses = mockClauses.filter((clause) => {
    const matchesSearch =
      clause.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clause.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All Types" || clause.type === selectedType
    const matchesRisk = selectedRisk === "All Levels" || clause.riskLevel === selectedRisk

    return matchesSearch && matchesType && matchesRisk
  })

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return "text-success bg-success/10 border-success/20"
      case "medium":
        return "text-warning bg-warning/10 border-warning/20"
      case "high":
        return "text-destructive bg-destructive/10 border-destructive/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getHighlightColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return "bg-success/20 border-l-4 border-success"
      case "medium":
        return "bg-warning/20 border-l-4 border-warning"
      case "high":
        return "bg-destructive/20 border-l-4 border-destructive"
      default:
        return "bg-muted/20"
    }
  }

  const handleClauseAction = (action: string, clause: Clause) => {
    switch (action) {
      case "copy":
        navigator.clipboard.writeText(clause.text)
        break
      case "download":
        const element = document.createElement("a")
        element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(clause.text)}`
        element.download = `clause-${clause.id}.txt`
        element.click()
        break
      case "view":
        setSelectedClause(clause.id)
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Clause Detection & Classification</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clauses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {clauseTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRisk} onValueChange={setSelectedRisk}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              {riskLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level === "All Levels" ? level : level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PDF Viewer Mock */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Document Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-6 min-h-96 space-y-4">
              <div className="text-center text-muted-foreground mb-6">
                <p className="font-medium">Legal Agreement - Page 1 of 4</p>
              </div>

              {/* Mock document content with highlighted clauses */}
              <div className="space-y-4 text-sm">
                <div className={cn("p-3 rounded", selectedClause === "5" ? getHighlightColor("safe") : "")}>
                  <p className="text-foreground leading-relaxed">
                    This Service Agreement ("Agreement") is entered into on [Date] between [Company Name] and [Client
                    Name].
                  </p>
                </div>

                <div
                  className={cn(
                    "p-3 rounded",
                    selectedClause === "5" ? getHighlightColor("safe") : "bg-success/10 border-l-4 border-success",
                  )}
                >
                  <p className="text-foreground leading-relaxed">
                    <strong>Payment Terms:</strong> Payment terms are Net 30 days from invoice date. Late payments may
                    incur a 1.5% monthly service charge.
                  </p>
                </div>

                <div
                  className={cn(
                    "p-3 rounded",
                    selectedClause === "1" ? getHighlightColor("safe") : "bg-success/10 border-l-4 border-success",
                  )}
                >
                  <p className="text-foreground leading-relaxed">
                    <strong>Indemnification:</strong> The Company shall indemnify and hold harmless the Client from any
                    claims arising from the performance of this Agreement.
                  </p>
                </div>

                <div className="p-3">
                  <p className="text-foreground leading-relaxed">
                    The services to be provided under this Agreement include but are not limited to...
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center pt-4">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success/40 rounded"></div>
                    <span>Safe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning/40 rounded"></div>
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive/40 rounded"></div>
                    <span>High Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clauses Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Detected Clauses ({filteredClauses.length})</span>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClauses.map((clause) => (
                <div
                  key={clause.id}
                  className={cn(
                    "border rounded-lg p-4 space-y-3 cursor-pointer transition-colors",
                    selectedClause === clause.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                  )}
                  onClick={() => setSelectedClause(selectedClause === clause.id ? null : clause.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {clause.type}
                        </Badge>
                        <Badge className={cn("text-xs", getRiskColor(clause.riskLevel))}>
                          {clause.riskLevel.charAt(0).toUpperCase() + clause.riskLevel.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Page {clause.page} • {clause.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{clause.text}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClauseAction("copy", clause)
                      }}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClauseAction("download", clause)
                      }}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClauseAction("view", clause)
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View in PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
