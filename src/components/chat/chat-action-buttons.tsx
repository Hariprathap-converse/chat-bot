/**
 * Chat Action Floating Buttons
 * Quick access buttons for Employee Details and Website Generator
 */
import { Button } from "@/components/ui/button";
import { BsStars } from "react-icons/bs";
import { Loader2 } from "lucide-react";

interface ChatActionButtonsProps {
    onEmployeeDetailsClick: () => void;
    onWebsiteGeneratorClick: () => void;
}

export function ChatActionButtons({ onEmployeeDetailsClick, onWebsiteGeneratorClick }: ChatActionButtonsProps) {
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={onEmployeeDetailsClick}
                className="absolute z-50 bottom-[10px] -right-12 cursor-pointer p-2 rounded-[30px] font-semibold text-white bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 border border-white/30 flex items-center"
            >
                <BsStars className="min-h-[14px] size-[23px] min-w-[14px]" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={onWebsiteGeneratorClick}
                className="absolute z-50 bottom-[10px] -right-24 cursor-pointer p-2 rounded-[30px] font-semibold text-white bg-linear-to-r from-[#7468FC] via-[#ED799C] to-[#918FFF] active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 border border-white/30 flex items-center"
            >
                <Loader2 className="min-h-[14px] animate-spin size-[23px] min-w-[14px]" />
            </Button>
        </>
    );
}
