"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, RotateCcw, Languages, FileText, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface Translation {
  id: string
  originalText: string
  simplifiedText: string
  type: string
  complexity: "high" | "medium" | "low"
  page: number
  readabilityScore: number
}

const mockTranslations: Translation[] = [
  {
    id: "1",
    originalText:
      "The Company shall indemnify and hold harmless the Client from and against any and all claims, demands, losses, costs, expenses, obligations, liabilities, damages, recoveries, and deficiencies, including interest, penalties, and reasonable attorney fees, that the Client may incur or suffer, which arise out of or result from any breach of this Agreement by the Company.",
    simplifiedText:
      "If the Company breaks this agreement, they will pay for any legal costs, damages, or other expenses that the Client faces because of that breach. This includes lawyer fees and court costs.",
    type: "Indemnification",
    complexity: "high",
    page: 1,
    readabilityScore: 85,
  },
  {
    id: "2",
    originalText:
      "Either party may terminate this Agreement at any time without cause by providing thirty (30) days written notice to the other party, whereupon all rights and obligations hereunder shall cease, except for those provisions which by their nature are intended to survive termination.",
    simplifiedText:
      "Either side can end this agreement by giving the other side 30 days written notice. When the agreement ends, most obligations stop, but some important parts (like confidentiality) will continue.",
    type: "Termination",
    complexity: "medium",
    page: 2,
    readabilityScore: 92,
  },
  {
    id: "3",
    originalText:
      "All intellectual property rights, including but not limited to patents, copyrights, trademarks, trade secrets, and any other proprietary rights in or to any work product, inventions, discoveries, improvements, or developments conceived, created, or reduced to practice by the Company in the performance of this Agreement shall be the sole and exclusive property of the Company.",
    simplifiedText:
      "Any ideas, inventions, or creative work that the Company creates while doing this job belongs only to the Company. This includes patents, copyrights, and trade secrets.",
    type: "Intellectual Property",
    complexity: "high",
    page: 2,
    readabilityScore: 88,
  },
  {
    id: "4",
    originalText:
      "The Client acknowledges and agrees that time is of the essence with respect to the performance of the Company's obligations hereunder.",
    simplifiedText:
      "The Client agrees that the Company must complete their work on time - meeting deadlines is very important.",
    type: "Performance",
    complexity: "low",
    page: 3,
    readabilityScore: 95,
  },
  {
    id: "5",
    originalText:
      "In the event of any dispute arising out of or relating to this Agreement, the parties agree to first attempt to resolve such dispute through good faith negotiations. If such negotiations fail to resolve the dispute within sixty (60) days, the dispute shall be resolved through binding arbitration administered by the American Arbitration Association.",
    simplifiedText:
      "If there's a disagreement about this contract, both sides will first try to work it out by talking. If they can't solve it in 60 days, they'll use a neutral arbitrator to make the final decision.",
    type: "Dispute Resolution",
    complexity: "medium",
    page: 4,
    readabilityScore: 90,
  },
]

export function PlainEnglishTranslation() {
  const [viewMode, setViewMode] = useState<"side-by-side" | "single">("side-by-side")
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null)
  const [filterComplexity, setFilterComplexity] = useState<string>("all")

  const filteredTranslations = mockTranslations.filter(
    (translation) => filterComplexity === "all" || translation.complexity === filterComplexity,
  )

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
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

  const handleCopy = (text: string, type: "original" | "simplified") => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleDownload = (translation: Translation) => {
    const content = `Original Text:\n${translation.originalText}\n\nPlain English Translation:\n${translation.simplifiedText}\n\nType: ${translation.type}\nReadability Score: ${translation.readabilityScore}%`
    const element = document.createElement("a")
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`
    element.download = `translation-${translation.id}.txt`
    element.click()
  }

  const averageReadability = Math.round(
    filteredTranslations.reduce((sum, t) => sum + t.readabilityScore, 0) / filteredTranslations.length,
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Plain English Translation</h2>
        <p className="text-muted-foreground">Complex legal language translated into clear, understandable English</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Translations</CardTitle>
            <Languages className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{filteredTranslations.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Readability</CardTitle>
            <Eye className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{averageReadability}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Complexity</CardTitle>
            <FileText className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {mockTranslations.filter((t) => t.complexity === "high").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">View Mode</CardTitle>
            <RotateCcw className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "side-by-side" ? "single" : "side-by-side")}
              className="w-full"
            >
              {viewMode === "side-by-side" ? "Side by Side" : "Single View"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterComplexity === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterComplexity("all")}
        >
          All Complexity ({mockTranslations.length})
        </Button>
        <Button
          variant={filterComplexity === "high" ? "destructive" : "outline"}
          size="sm"
          onClick={() => setFilterComplexity("high")}
        >
          High Complexity ({mockTranslations.filter((t) => t.complexity === "high").length})
        </Button>
        <Button
          variant={filterComplexity === "medium" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setFilterComplexity("medium")}
          className={filterComplexity === "medium" ? "bg-warning text-warning-foreground hover:bg-warning/90" : ""}
        >
          Medium Complexity ({mockTranslations.filter((t) => t.complexity === "medium").length})
        </Button>
        <Button
          variant={filterComplexity === "low" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setFilterComplexity("low")}
          className={filterComplexity === "low" ? "bg-success text-success-foreground hover:bg-success/90" : ""}
        >
          Low Complexity ({mockTranslations.filter((t) => t.complexity === "low").length})
        </Button>
      </div>

      {/* Translations */}
      <div className="space-y-4">
        {filteredTranslations.map((translation) => (
          <Card key={translation.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {translation.type}
                  </Badge>
                  <Badge className={cn("text-xs", getComplexityColor(translation.complexity))}>
                    {translation.complexity.charAt(0).toUpperCase() + translation.complexity.slice(1)} Complexity
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Page {translation.page} • Readability: {translation.readabilityScore}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleDownload(translation)}>
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "side-by-side" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Original Text */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">Original Legal Text</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(translation.originalText, "original")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm text-foreground leading-relaxed">{translation.originalText}</p>
                    </div>
                  </div>

                  {/* Simplified Text */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">Plain English Translation</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(translation.simplifiedText, "simplified")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <p className="text-sm text-foreground leading-relaxed">{translation.simplifiedText}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Tabs defaultValue="original" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="original">Original Text</TabsTrigger>
                    <TabsTrigger value="simplified">Plain English</TabsTrigger>
                  </TabsList>
                  <TabsContent value="original" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">Original Legal Text</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(translation.originalText, "original")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm text-foreground leading-relaxed">{translation.originalText}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="simplified" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">Plain English Translation</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(translation.simplifiedText, "simplified")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <p className="text-sm text-foreground leading-relaxed">{translation.simplifiedText}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTranslations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Languages className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No translations found</h3>
            <p className="text-muted-foreground">No clauses match the selected complexity filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
