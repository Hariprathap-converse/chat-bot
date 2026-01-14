"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Trash2,
    Clock,
    X,
    Edit2,
    Sun,
    Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdvancedInput } from "@/components/custom/advanced-input";
import { DateTimePicker } from "@/components/custom/calendar/advanced-calender";
import { FormConfig, InputFieldConfig, DataMaskingConfig } from "@/types/components/form-config.type";
import { CalendarFieldConfig } from "@/types/components/calender";

// Mock Config Generators
const createFormConfig = (): FormConfig => ({
    theme: "light",
    primaryColor: "hsl(221.2 83.2% 53.3%)",
    fontSize: "medium",
    layout: { columns: 3, labelPosition: "top" },
    viewMode: false,
    editMode: true,
});

const createInputConfig = (id: string, label: string, value: string, type: "text" | "email" = "text"): InputFieldConfig => ({
    tableId: "users",
    id,
    name: id,
    label,
    type,
    value,
    isRequired: { value: false },
    autoPopulate: { autoFill: false },
    behavior: {
        showCharCounter: false,
        showClearIcon: false,
        dataMasking: { enabled: false } as DataMaskingConfig,
        spellCheck: false,
        autoTrim: false,
        copyPasteRestriction: false,
        preventScreenshot: false
    },
    security: { auditEnabled: false, fieldLevelSecurity: "visible" },
});
const createCalendarConfig = (id: string, label: string, value: string): CalendarFieldConfig => ({
    tableId: "users",
    id,
    name: id,
    label,
    type: "calendar",
    value,
    dateFormat: "DD/MM/YYYY",
    isRequired: { value: false },
    behavior: { copyPasteRestriction: false },
    autoPopulate: { autofill: false },
});

interface SettingsPopupProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SettingsPopup({ open, onOpenChange }: SettingsPopupProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-[60%] !px-8  !rounded-[14px] min-h-[570px] max-h-[570px] flex flex-col p-0 overflow-hidden bg-white dark:bg-zinc-950 sm:max-w-5xl  border-none shadow-none">
                <div className="p-6 pb-2">
                    <DialogHeader className="flex flex-row items-center justify-between space-y-0">
                        <DialogTitle className="text-xl  text-indigo-500">Settings</DialogTitle>
                        {/* Close button is automatically added by DialogContent */}
                    </DialogHeader>
                </div>

                <Tabs defaultValue="personal-details" className="flex flex-col flex-1 overflow-hidden">
                    <div className="px-6 border-b-0">
                        <TabsList className="bg-transparent p-0 justify-start max-w-fit gap-6 h-auto">
                            <TabsTrigger
                                value="personal-details"
                                className="bg-transparent border-none shadow-none  p-1.5 px-5 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-600 text-gray-500 data-[state=active]:shadow-none transition-colors font-medium rounded-[6px]"
                            >
                                Personal Details
                            </TabsTrigger>
                            <TabsTrigger
                                value="chat-history"
                                className="bg-transparent border-none shadow-none  p-1.5 px-5 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-600 text-gray-500 data-[state=active]:shadow-none transition-colors font-medium rounded-[6px]"
                            >
                                Chat History
                            </TabsTrigger>
                            <TabsTrigger
                                value="theme"
                                className="bg-transparent border-none shadow-none  p-1.5 px-5 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-600 text-gray-500 data-[state=active]:shadow-none transition-colors font-medium rounded-[6px]"
                            >
                                Theme
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-zinc-950">
                        <TabsContent value="personal-details" className="mt-0 h-full min-h-[370px] border border-gray-100 rounded-[6px] p-8 shadow-none">
                            <PersonalDetailsTab />
                        </TabsContent>
                        <TabsContent value="chat-history" className="mt-0 h-full min-h-[370px] border border-gray-100 rounded-[6px] p-0 px-5 shadow-none">
                            <ChatHistoryTab />
                        </TabsContent>
                        <TabsContent value="theme" className="mt-0 h-full min-h-[370px] border border-gray-100 rounded-[6px] p-8 shadow-none">
                            <ThemeTab />
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

function PersonalDetailsTab() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: "CDS0001",
        firstName: "Kavin",
        lastName: "Kumar",
        email: "kavinkumar@gmail.com",
        phone: "9876543219",
        dob: new Date("1998-08-27"),
        address: "123 Abc Street",
        gender: "Male",
        nationality: "Indian",
        maritalStatus: "Single"
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [errors, setErrors] = useState<Record<string, string>>({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const formConfig = createFormConfig();

    return (
        <div className="relative h-full flex flex-col">
            {!isEditing && (
                <div className="absolute top-0 right-0 z-10">
                    <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="text-indigo-500 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 gap-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit
                    </Button>
                </div>
            )}

            {isEditing ? (
                <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 flex-1 overflow-y-auto pr-2 pb-4">
                        <AdvancedInput
                            config={createInputConfig("employeeId", "Employee ID", formData.employeeId)}
                            formConfig={formConfig}
                            value={formData.employeeId}
                            onChange={(val) => handleInputChange("employeeId", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("firstName", "First Name", formData.firstName)}
                            formConfig={formConfig}
                            value={formData.firstName}
                            onChange={(val) => handleInputChange("firstName", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("lastName", "Last Name", formData.lastName)}
                            formConfig={formConfig}
                            value={formData.lastName}
                            onChange={(val) => handleInputChange("lastName", val)}
                        />

                        <AdvancedInput
                            config={createInputConfig("email", "Email Address", formData.email, "email")}
                            formConfig={formConfig}
                            value={formData.email}
                            onChange={(val) => handleInputChange("email", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("phone", "Phone No", formData.phone)}
                            formConfig={formConfig}
                            value={formData.phone}
                            onChange={(val) => handleInputChange("phone", val)}
                        />
                        <DateTimePicker
                            config={createCalendarConfig("dob", "Date Of Birth", formData.dob.toISOString())}
                            formConfig={formConfig}
                            fieldName="dob"
                            value={formData.dob}

                            onChange={(val) => handleInputChange("dob", val)}
                            calendarDisableConfig={{} as any}
                            formValues={formData}
                        />

                        <AdvancedInput
                            config={createInputConfig("address", "Address", formData.address)}
                            formConfig={formConfig}
                            value={formData.address}
                            onChange={(val) => handleInputChange("address", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("gender", "Gender", formData.gender)}
                            formConfig={formConfig}
                            value={formData.gender}
                            onChange={(val) => handleInputChange("gender", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("nationality", "Nationality", formData.nationality)}
                            formConfig={formConfig}
                            value={formData.nationality}
                            onChange={(val) => handleInputChange("nationality", val)}
                        />

                        <AdvancedInput
                            config={createInputConfig("maritalStatus", "Marital Status", formData.maritalStatus)}
                            formConfig={formConfig}
                            value={formData.maritalStatus}
                            onChange={(val) => handleInputChange("maritalStatus", val)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            className="text-indigo-500 border-indigo-200 hover:bg-indigo-50 w-24 h-10"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setIsEditing(false)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white w-24 h-10"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 pr-20">
                    <DetailItem label="Employee ID" value={formData.employeeId} />
                    <DetailItem label="First Name" value={formData.firstName} />
                    <DetailItem label="Last Name" value={formData.lastName} />

                    <DetailItem label="Email Address" value={formData.email} />
                    <DetailItem label="Phone No" value={formData.phone} />
                    <DetailItem label="Date Of Birth" value={formData.dob.toLocaleDateString()} />

                    <DetailItem label="Address" value={formData.address} />
                    <DetailItem label="Gender" value={formData.gender} />
                    <DetailItem label="Nationality" value={formData.nationality} />

                    <DetailItem label="Marital Status" value={formData.maritalStatus} />
                </div>
            )}
        </div>
    )
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-400 font-medium">{label}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{value}</span>
        </div>
    )
}

function ChatHistoryTab() {
    return (
        <div className="flex flex-col gap-4 py-2">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search your activity..." className="pl-9 bg-white border-gray-200" />
                </div>
                <Button variant="outline" className="text-indigo-500 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete all
                </Button>
            </div>

            <div className="mt-2 space-y-6">
                {/* Today Section */}
                <div className="bg-gray-50/50 dark:bg-zinc-900/50 rounded-[6px] overflow-hidden border border-none ">
                    <div className="bg-gray-50 dark:bg-zinc-900 px-4 py-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">Today</span>
                        <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                        <HistoryItem
                            title="Leave Request"
                            subtitle="Your Leave Application For One Day Has Been Approved..."
                            time="1:30 PM"
                        />
                        <HistoryItem
                            title="Personal Details Update"
                            subtitle="Please Confirm Your Updated Address Information..."
                            time="4:09 PM"
                        />
                    </div>
                </div>

                {/* Yesterday Section */}
                <div className="bg-gray-50/50 dark:bg-zinc-900/50 rounded-[6px] overflow-hidden border border-none ">
                    <div className="bg-gray-50 dark:bg-zinc-900 px-4 py-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">Yesterday</span>
                        <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                        <HistoryItem
                            title="Leave Request"
                            subtitle="Your Leave Application For One Day Has Been Approved..."
                            time="8:16 PM"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function HistoryItem({ title, subtitle, time }: { title: string, subtitle: string, time: string }) {
    return (
        <div className="p-4 bg-white dark:bg-zinc-950 flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{title}</span>
                <span className="text-xs text-gray-500">{subtitle}</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {time}
                </div>
                <a href="#" className="text-xs text-indigo-500 font-medium hover:underline">View Details</a>
                <X className="w-4 h-4 text-gray-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500" />
            </div>
        </div>
    )
}

function ThemeTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wider">Theme</h3>
            <div className="flex items-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border border-indigo-500 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    </div>
                    <Sun className="w-5 h-5 text-gray-600 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Light</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        {/* Unchecked state */}
                    </div>
                    <Moon className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">Dark</span>
                </label>
            </div>
        </div>
    )
}
