"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, AlertTriangle, Shield, Target, Download, FileBarChart, Eye } from "lucide-react"

interface DashboardSummaryProps {
  totalClauses: number
  riskyClauses: number
  safeClauses: number
  confidenceScore: number
  onViewDetails: (section: string) => void
}

export function DashboardSummary({
  totalClauses,
  riskyClauses,
  safeClauses,
  confidenceScore,
  onViewDetails,
}: DashboardSummaryProps) {
  const summaryCards = [
    {
      title: "Total Clauses",
      value: totalClauses,
      icon: FileText,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      title: "Risky Clauses",
      value: riskyClauses,
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Safe Clauses",
      value: safeClauses,
      icon: Shield,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Confidence Score",
      value: `${confidenceScore}%`,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  const actionButtons = [
    {
      label: "View Clause Details",
      action: () => onViewDetails("clause-detection"),
      icon: Eye,
      variant: "default" as const,
    },
    {
      label: "View Risky Clauses",
      action: () => onViewDetails("risk-flags"),
      icon: AlertTriangle,
      variant: "destructive" as const,
    },
    {
      label: "View Summary",
      action: () => onViewDetails("summarization"),
      icon: FileBarChart,
      variant: "secondary" as const,
    },
    {
      label: "Download Report",
      action: () => {
        // Mock download functionality
        const element = document.createElement("a")
        element.href = "data:text/plain;charset=utf-8,Legal Document Analysis Report"
        element.download = "legal-analysis-report.txt"
        element.click()
      },
      icon: Download,
      variant: "outline" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <div className={`p-2 rounded-full ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {actionButtons.map((button) => {
              const Icon = button.icon
              return (
                <Button
                  key={button.label}
                  variant={button.variant}
                  onClick={button.action}
                  className="flex items-center space-x-2 h-auto py-3"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{button.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
