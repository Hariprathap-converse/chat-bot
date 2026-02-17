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
import { Search, Trash2, Clock, X, Edit2, Sun, Moon } from "lucide-react";
import { AdvancedInput } from "@/components/custom/advanced-input";
import { DateTimePicker } from "@/components/custom/calendar/advanced-calender";
import {
  FormConfig,
  InputFieldConfig,
  DataMaskingConfig,
} from "@/types/components/form-config.type";
import { CalendarFieldConfig } from "@/types/components/calender";

// Mock Config Generators
const createFormConfig = (): FormConfig => ({
  theme: "light",
  primaryColor: "hsl(221.2 83.2% 53.3%)",
  fontSize: "small",
  layout: { columns: 3, labelPosition: "top" },
  viewMode: false,
  editMode: true,
});
const createFormConfigz = (): FormConfig => ({
  theme: "light",
  primaryColor: "hsl(221.2 83.2% 53.3%)",
  fontSize: "small",
  layout: { columns: 3, labelPosition: "top" },
  viewMode: true,
  editMode: false,
});

const createInputConfig = (
  id: string,
  label: string,
  value: string,
  type: "text" | "email" = "text",
): InputFieldConfig => ({
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
    preventScreenshot: false,
  },
  security: { auditEnabled: false, fieldLevelSecurity: "visible" },
});
const createCalendarConfig = (
  id: string,
  label: string,
  value: string,
): CalendarFieldConfig => ({
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
      <DialogContent className="min-w-[60%] !px-8 gap-2 !rounded-[14px] min-h-[570px] max-h-[570px] flex flex-col p-0 overflow-hidden bg-white dark:bg-zinc-950 sm:max-w-5xl  border-none shadow-none">
        <div className="p-6 pb-1">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-xl  text-indigo-500">
              Settings
            </DialogTitle>
            {/* Close button is automatically added by DialogContent */}
          </DialogHeader>
        </div>

        <Tabs
          defaultValue="personal-details"
          className="flex flex-col flex-1 gap-1 overflow-hidden"
        >
          <div className="px-6 border-b-0 pt-1">
            <TabsList className="bg-transparent p-0 justify-start max-w-fit gap-3 h-auto">
              <TabsTrigger
                value="personal-details"
                className="bg-transparent focus:ring-0 focus-visible:ring-0 border-none shadow-none  p-1.5 px-5 data-[state=active]:bg-[hsla(245,96%,70%,0.1)] hover:bg-[hsla(245,96%,70%,0.1)] hover:text-[hsla(245,96%,70%,1)] cursor-pointer data-[state=active]:text-[hsla(245,96%,70%,1)] text-gray-500 data-[state=active]:shadow-none transition-colors font-medium rounded-[6px]"
              >
                Personal Details
              </TabsTrigger>
              {/* <TabsTrigger
                value="chat-history"
                className="bg-transparent border-none shadow-none  p-1.5 px-5 data-[state=active]:bg-[hsla(245,96%,70%,0.1)] hover:bg-[hsla(245,96%,70%,0.1)] hover:text-[hsla(245,96%,70%,1)] cursor-pointer data-[state=active]:text-[hsla(245,96%,70%,1)] text-gray-500 data-[state=active]:shadow-none transition-colors font-medium rounded-[6px]"
              >
                Chat History
              </TabsTrigger> */}
              <TabsTrigger
                value="theme"
                className="bg-transparent border-none shadow-none  focus:ring-0 focus-visible:ring-0  p-1.5 px-5 data-[state=active]:bg-[hsla(245,96%,70%,0.1)] hover:bg-[hsla(245,96%,70%,0.1)] hover:text-[hsla(245,96%,70%,1)] cursor-pointer data-[state=active]:text-[hsla(245,96%,70%,1)] text-gray-500 data-[state=active]:shadow-none transition-colors font-medium rounded-[6px]"
              >
                Theme
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-zinc-950">
            <TabsContent
              value="personal-details"
              className="mt-0 h-full min-h-[370px] border border-gray-100 dark:border-border rounded-[6px] p-6 pt-4 pr-3 shadow-none"
            >
              <PersonalDetailsTab />
            </TabsContent>
            {/* <TabsContent value="chat-history" className="mt-0 h-full min-h-[370px] border border-gray-100 rounded-[6px] p-0 px-5 shadow-none">
                            <ChatHistoryTab />
                        </TabsContent> */}
            <TabsContent
              value="theme"
              className="mt-0 h-full min-h-[370px] border border-gray-100 dark:border-border rounded-[6px] p-8 py-5 shadow-none"
            >
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
    maritalStatus: "Single",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<Record<string, string>>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formConfig = createFormConfig();
  const formConfigz = createFormConfigz();

  return (
    <div className="relative h-full flex flex-col">
      {isEditing ? (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 flex-1 overflow-y-auto pr-2 pb-4">
            <AdvancedInput
              config={createInputConfig(
                "employeeId",
                "Employee ID",
                formData.employeeId,
              )}
              formConfig={formConfig}
              value={formData.employeeId}
              onChange={(val) => handleInputChange("employeeId", val)}
            />
            <AdvancedInput
              config={createInputConfig(
                "firstName",
                "First Name",
                formData.firstName,
              )}
              formConfig={formConfig}
              value={formData.firstName}
              onChange={(val) => handleInputChange("firstName", val)}
            />
            <AdvancedInput
              config={createInputConfig(
                "lastName",
                "Last Name",
                formData.lastName,
              )}
              formConfig={formConfig}
              value={formData.lastName}
              onChange={(val) => handleInputChange("lastName", val)}
            />

            <AdvancedInput
              config={createInputConfig(
                "email",
                "Email Address",
                formData.email,
                "email",
              )}
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
              config={createCalendarConfig(
                "dob",
                "Date Of Birth",
                formData.dob.toISOString(),
              )}
              formConfig={formConfig}
              fieldName="dob"
              value={formData.dob}
              // onChange={(val) => handleInputChange("dob", val)}
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
              config={createInputConfig(
                "nationality",
                "Nationality",
                formData.nationality,
              )}
              formConfig={formConfig}
              value={formData.nationality}
              onChange={(val) => handleInputChange("nationality", val)}
            />

            <AdvancedInput
              config={createInputConfig(
                "maritalStatus",
                "Marital Status",
                formData.maritalStatus,
              )}
              formConfig={formConfig}
              value={formData.maritalStatus}
              onChange={(val) => handleInputChange("maritalStatus", val)}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-none">
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
        <div className="flex w-full">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0 h-fit  flex-1 overflow-y-auto pr-2 pb-4 ">
                        <AdvancedInput
                            config={createInputConfig("employeeId", "Employee ID", formData.employeeId)}
                            formConfig={formConfigz}
                            value={formData.employeeId}
                            onChange={(val) => handleInputChange("employeeId", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("firstName", "First Name", formData.firstName)}
                            formConfig={formConfigz}
                            value={formData.firstName}
                            onChange={(val) => handleInputChange("firstName", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("lastName", "Last Name", formData.lastName)}
                            formConfig={formConfigz}
                            value={formData.lastName}
                            onChange={(val) => handleInputChange("lastName", val)}
                        />

                        <AdvancedInput
                            config={createInputConfig("email", "Email Address", formData.email, "email")}
                            formConfig={formConfigz}
                            value={formData.email}
                            onChange={(val) => handleInputChange("email", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("phone", "Phone No", formData.phone)}
                            formConfig={formConfigz}
                            value={formData.phone}
                            onChange={(val) => handleInputChange("phone", val)}
                        />
                        <DateTimePicker
                            config={createCalendarConfig("dob", "Date Of Birth", formData.dob.toISOString())}
                            formConfig={formConfigz}
                            fieldName="dob"
                            value={formData.dob}

                            onChange={(val) => handleInputChange("dob", val)}
                            calendarDisableConfig={{} as any}
                            formValues={formData}
                        />

                        <AdvancedInput
                            config={createInputConfig("address", "Address", formData.address)}
                            formConfig={formConfigz}
                            value={formData.address}
                            onChange={(val) => handleInputChange("address", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("gender", "Gender", formData.gender)}
                            formConfig={formConfigz}
                            value={formData.gender}
                            onChange={(val) => handleInputChange("gender", val)}
                        />
                        <AdvancedInput
                            config={createInputConfig("nationality", "Nationality", formData.nationality)}
                            formConfig={formConfigz}
                            value={formData.nationality}
                            onChange={(val) => handleInputChange("nationality", val)}
                        />

                        <AdvancedInput
                            config={createInputConfig("maritalStatus", "Marital Status", formData.maritalStatus)}
                            formConfig={formConfigz}
                            value={formData.maritalStatus}
                            onChange={(val) => handleInputChange("maritalStatus", val)}
                        />
                    </div> */}
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 ">
            <DetailItem label="Employee ID" value={formData.employeeId} />
            <DetailItem label="First Name" value={formData.firstName} />
            <DetailItem label="Last Name" value={formData.lastName} />

            <DetailItem label="Email Address" value={formData.email} />
            <DetailItem label="Phone No" value={formData.phone} />
            <DetailItem
              label="Date Of Birth"
              value={formData.dob.toLocaleDateString()}
            />

            <DetailItem label="Address" value={formData.address} />
            <DetailItem label="Gender" value={formData.gender} />
            <DetailItem label="Nationality" value={formData.nationality} />

            <DetailItem label="Marital Status" value={formData.maritalStatus} />
          </div>
          {!isEditing && (
            <div className="">
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="gap-2 ml-5 !px-5 transition-all border border-primary/20 duration-300 bg-transparent hover:bg-primary/10 hover:border-transparent cursor-pointer text-primary  shadow-none border rounded-[4px] max-h-[30px]"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-gray-400 font-normal">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {value}
      </span>
    </div>
  );
}

// function ChatHistoryTab() {
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//     return (
//         <div className="flex flex-col gap-4 py-2">
//             <div className="flex items-center justify-between gap-4">
//                 <div className="relative flex-1 max-w-sm">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <Input placeholder="Search your activity..." className="pl-9 bg-white border-gray-200" />
//                 </div>
//                 <Button
//                     onClick={() => setShowDeleteConfirm(true)}
//                     className="gap-2  transition-all duration-300 bg-transparent hover:bg-primary/10 hover:border-transparent cursor-pointer text-primary  shadow-none border rounded-[4px] "

//                 >
//                     <span className="">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
//                             <path d="M11.9055 5.56055C11.9055 5.56055 11.5166 10.3845 11.291 12.4165C11.1835 13.387 10.584 13.9557 9.60205 13.9736C7.73335 14.0073 5.86251 14.0094 3.99453 13.97C3.0498 13.9507 2.46033 13.3748 2.35504 12.4215C2.12799 10.3716 1.74121 5.56055 1.74121 5.56055" stroke="#7468FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M12.8962 3.24875H0.75" stroke="#7468FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M10.5553 3.24899C9.99306 3.24899 9.50887 2.85148 9.39857 2.30068L9.22452 1.42972C9.11708 1.0279 8.75323 0.75 8.33852 0.75H5.30664C4.89193 0.75 4.52807 1.0279 4.42064 1.42972L4.24659 2.30068C4.13628 2.85148 3.6521 3.24899 3.08984 3.24899" stroke="#7468FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </span>
//                     Delete all
//                 </Button>
//             </div>

//             <div className="mt-2 space-y-6">
//                 {/* Today Section */}
//                 <div className="bg-gray-50/50 dark:bg-zinc-900/50 rounded-[6px] overflow-hidden border border-none ">
//                     <div className="bg-gray-50 dark:bg-zinc-900 px-4 py-2 flex items-center justify-between">
//                         <span className="text-sm text-gray-500 font-medium">Today</span>
//                         <X onClick={() => setShowDeleteConfirm(true)} className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
//                     </div>
//                     <div className="divide-y divide-gray-100 dark:divide-zinc-800">
//                         <HistoryItem
//                             title="Leave Request"
//                             subtitle="Your Leave Application For One Day Has Been Approved..."
//                             time="1:30 PM"
//                         />
//                         <HistoryItem
//                             title="Personal Details Update"
//                             subtitle="Please Confirm Your Updated Address Information..."
//                             time="4:09 PM"
//                         />
//                     </div>
//                 </div>

//                 {/* Yesterday Section */}
//                 <div className="bg-gray-50/50 dark:bg-zinc-900/50 rounded-[6px] overflow-hidden border border-none ">
//                     <div className="bg-gray-50 dark:bg-zinc-900 px-4 py-2 flex items-center justify-between">
//                         <span className="text-sm text-gray-500 font-medium">Yesterday</span>
//                         <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
//                     </div>
//                     <div className="divide-y divide-gray-100 dark:divide-zinc-800">
//                         <HistoryItem
//                             title="Leave Request"
//                             subtitle="Your Leave Application For One Day Has Been Approved..."
//                             time="8:16 PM"
//                         />
//                     </div>
//                 </div>
//             </div>

//             <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
//                 <DialogContent className="sm:max-w-[600px] p-6 !rounded-[8px] bg-white border-none shadow-xl gap-0">
//                     <div className="flex gap-4 items-center">
//                         <div className="w-10 h-10 rounded-full bg-[#eeeefc] flex items-center justify-center shrink-0">
//                             <Trash2 className="w-6 h-6 text-primary stroke-2.5" />
//                         </div>
//                         <div className="flex-1 pt-1">
//                             <DialogTitle className="text-[16px] font-bold text-gray-900 mb-1">Are you sure?</DialogTitle>
//                             <p className="text-[14px] text-gray-500 leading-relaxed">Are you sure you want to delete this activity?</p>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-end gap-3 w-full mt-6">
//                         <Button
//                             variant="ghost"
//                             onClick={() => setShowDeleteConfirm(false)}
//                             className="text-[#6366f1] font-normal cursor-pointer hover:bg-transparent hover:font-medium"
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             onClick={() => setShowDeleteConfirm(false)}
//                             className=" bg-[hsl(245,96%,78%)] border border-primary hover:bg-[hsl(245,96%,78%)] text-white shadow-lg px-6 rounded-lg font-medium transition-all group "
//                         >
//                             <p className="group-hover:scale-105 cursor-pointer  duration-300 transition-all">Delete</p>
//                         </Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

function HistoryItem({
  title,
  subtitle,
  time,
}: {
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-950 flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
          {title}
        </span>
        <span className="text-xs text-gray-500">{subtitle}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          {time}
        </div>
        <a
          href="#"
          className="text-xs text-indigo-500 font-medium hover:font-semibold"
        >
          View Details
        </a>
        <X className="w-4 h-4 text-gray-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500" />
      </div>
    </div>
  );
}

import { useTheme } from "next-themes";

// ... existing code ...

function ThemeTab() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-5">
      <h3 className="text-[12px] text-gray-400   tracking-wider">Theme</h3>
      <div className="flex items-center gap-8">
        <label
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setTheme("light")}
        >
          <div
            className={`w-[18px] h-[18px] rounded-full flex items-center justify-center ${theme === "light" ? "bg-indigo-500" : "border border-gray-300"}`}
          >
            {theme === "light" && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <Sun
            className={`w-5 h-5 transition-colors ${theme === "light" ? "text-gray-900 dark:text-gray-100" : "text-gray-400"}`}
          />
          <span
            className={`text-sm font-medium transition-colors ${theme === "light" ? "text-gray-900 dark:text-gray-100" : "text-gray-500"}`}
          >
            Light
          </span>
        </label>

        <label
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setTheme("dark")}
        >
          <div
            className={`w-[18px] h-[18px] rounded-full flex items-center justify-center ${theme === "dark" ? "bg-indigo-500" : "border border-gray-300"}`}
          >
            {theme === "dark" && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <Moon
            className={`w-4 h-4 transition-colors ${theme === "dark" ? "text-gray-900 dark:text-gray-100" : "text-gray-400"}`}
          />
          <span
            className={`text-sm font-medium transition-colors ${theme === "dark" ? "text-gray-900 dark:text-gray-100" : "text-gray-500"}`}
          >
            Dark
          </span>
        </label>
      </div>
    </div>
  );
}
