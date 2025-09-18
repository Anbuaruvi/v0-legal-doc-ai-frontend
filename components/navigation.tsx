"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, AlertTriangle, Languages, Edit3, FileBarChart, Target, Settings, LogOut } from "lucide-react"

const navigationTabs = [
  { id: "dashboard", label: "Dashboard", icon: FileText },
  { id: "clause-detection", label: "Clause Detection", icon: FileText },
  { id: "risk-flags", label: "Risk Flags", icon: AlertTriangle },
  { id: "plain-english", label: "Plain English", icon: Languages },
  { id: "rewrite", label: "Rewrite Suggestions", icon: Edit3 },
  { id: "summarization", label: "Summarization", icon: FileBarChart },
  { id: "confidence", label: "Confidence Score", icon: Target },
]

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">LegalDocAI</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{tab.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
