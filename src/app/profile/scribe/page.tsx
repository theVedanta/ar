"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, FileText } from "lucide-react"

export default function ScribeProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    age: "",
    gender: "",
    subjects: [] as string[],
    examPreference: "",
    examTypes: [] as string[],
    handwritingSample: null as File | null,
    language: "",
    availability: {
      days: [] as string[],
      timeSlots: [] as string[],
    },
    locationPreference: "",
    ethicsAgreement: false,
  })

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Hindi",
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Computer Science",
  ]

  const examTypes = ["11th Grade", "12th Grade", "UPSC", "JEE", "NEET", "Other Competitive Exams"]
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const timeSlots = ["Morning (9AM-12PM)", "Afternoon (12PM-4PM)", "Evening (4PM-8PM)"]

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({ ...prev, subjects: [...prev.subjects, subject] }))
    } else {
      setFormData((prev) => ({ ...prev, subjects: prev.subjects.filter((s) => s !== subject) }))
    }
  }

  const handleExamTypeChange = (examType: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({ ...prev, examTypes: [...prev.examTypes, examType] }))
    } else {
      setFormData((prev) => ({ ...prev, examTypes: prev.examTypes.filter((e) => e !== examType) }))
    }
  }

  const handleAvailabilityChange = (type: "days" | "timeSlots", value: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          [type]: [...prev.availability[type], value],
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          [type]: prev.availability[type].filter((item) => item !== value),
        },
      }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, handwritingSample: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Scribe profile:", formData)
    // Redirect to dashboard
    window.location.href = "/dashboard/scribe"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Scribe Profile Setup</CardTitle>
            <CardDescription>
              Help us understand your expertise and availability to match you with students who need your help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="class">Current Class/Qualification *</Label>
                  <Input
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData((prev) => ({ ...prev, class: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Subject Expertise */}
              <div>
                <Label className="text-base font-medium mb-3 block">Subjects you're confident in *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={`subject-${subject}`}
                        checked={formData.subjects.includes(subject)}
                        onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                      />
                      <Label htmlFor={`subject-${subject}`} className="text-sm">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Preferences */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Exam Preference *</Label>
                  <RadioGroup
                    value={formData.examPreference}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, examPreference: value }))}
                    className="flex flex-wrap gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="written" id="written" />
                      <Label htmlFor="written">Written</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="computerised" id="computerised" />
                      <Label htmlFor="computerised">Computerised</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Volunteer for which exams? *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {examTypes.map((examType) => (
                      <div key={examType} className="flex items-center space-x-2">
                        <Checkbox
                          id={`exam-${examType}`}
                          checked={formData.examTypes.includes(examType)}
                          onCheckedChange={(checked) => handleExamTypeChange(examType, checked as boolean)}
                        />
                        <Label htmlFor={`exam-${examType}`} className="text-sm">
                          {examType}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Handwriting Sample */}
              {(formData.examPreference === "written" || formData.examPreference === "both") && (
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Handwriting Sample *
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="handwriting" className="cursor-pointer text-blue-600 hover:text-blue-500">
                        Upload a sample of your handwriting
                      </Label>
                      <Input
                        id="handwriting"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <p className="text-sm text-gray-500">PNG, JPG or PDF up to 5MB</p>
                      {formData.handwritingSample && (
                        <p className="text-sm text-green-600">✓ {formData.handwritingSample.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Language & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language Preference *</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="regional">Regional Language</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="locationPreference">Location Preference *</Label>
                  <Input
                    id="locationPreference"
                    placeholder="City or area you prefer"
                    value={formData.locationPreference}
                    onChange={(e) => setFormData((prev) => ({ ...prev, locationPreference: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">Available Days *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {days.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day}`}
                          checked={formData.availability.days.includes(day)}
                          onCheckedChange={(checked) => handleAvailabilityChange("days", day, checked as boolean)}
                        />
                        <Label htmlFor={`day-${day}`} className="text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Available Time Slots *</Label>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <div key={slot} className="flex items-center space-x-2">
                        <Checkbox
                          id={`slot-${slot}`}
                          checked={formData.availability.timeSlots.includes(slot)}
                          onCheckedChange={(checked) => handleAvailabilityChange("timeSlots", slot, checked as boolean)}
                        />
                        <Label htmlFor={`slot-${slot}`} className="text-sm">
                          {slot}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ethics Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="ethics"
                  checked={formData.ethicsAgreement}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, ethicsAgreement: checked as boolean }))
                  }
                  required
                />
                <Label htmlFor="ethics" className="text-sm leading-relaxed">
                  I agree to the scribe ethics and guidelines. I understand my responsibilities as a volunteer scribe
                  and commit to maintaining confidentiality and providing fair assistance. *
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={!formData.ethicsAgreement}>
                Complete Profile & Start Helping
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
