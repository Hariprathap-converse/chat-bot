/**
 * Empty Chat State Component
 * Displays when no messages exist
 */
interface EmptyChatStateProps {
    title: string;
    subtitle: string;
}

export function EmptyChatState({ title, subtitle }: EmptyChatStateProps) {
    return (
        <div className="flex flex-col items-center gap-[27px]">
            <div className="flex flex-col items-center w-full gap-1.5">
                <span className="bg-[linear-gradient(90deg,#7468FC_1.11%,#ED799C_43.64%,#918FFF_99.05%)] bg-clip-text text-transparent font-semibold text-[45px] leading-[150%] tracking-normal">
                    {title}
                </span>
                <span className="text-foreground text-center max-w-[696px] font-medium leading-[150%] text-base tracking-normal">
                    {subtitle}
                </span>
            </div>
        </div>
    );
}
