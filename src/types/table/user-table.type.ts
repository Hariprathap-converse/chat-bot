import { BulkAction } from "./table.type"
import { RiUserSettingsLine } from 'react-icons/ri';
import { GrDocumentUser } from 'react-icons/gr';
import { FaLock, FaUnlock } from "react-icons/fa"

export const bulkActions: BulkAction[] = [
  { label: "Change Lock status to Lock/Unlock", value: "lockstatus" },
  { label: "Change status to Active/Inactive", value: "status" },
];

export const RoleOptionsData = [
  { label: "System", value: "system", icon: RiUserSettingsLine },
  { label: "Application", value: "application", icon: GrDocumentUser },
];

export const LockStatusOption = [
  { label: "Locked", value: "true", icon: FaLock },
  { label: "Unlocked", value: "false", icon: FaUnlock},
]

