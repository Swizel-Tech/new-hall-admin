import {
  DashboardCard,
  DashboardCardProps,
} from "../../../components/ui/dashboard-card";
import { cn } from "../../../utils/helpers";

interface DashboardCardRowProps {
  dashboardHeroCards: DashboardCardProps[];
}

export const DashboardCardRow: React.FC<DashboardCardRowProps> = ({
  dashboardHeroCards,
}) => {
  return (
    <div className={cn("relative rounded-[8px] h-full lg:h-[107px] w-full")}>
      <div
        className={cn(
          "flex flex-row rounded-[8px] justify-between w-full h-full items-center gap-2 overflow-x-auto"
        )}
      >
        {dashboardHeroCards.map((n) => (
          <DashboardCard
            key={n.title}
            {...n}
            childrenClassName="text-themeGrey bg-white px-4 text-sm"
            className="flex-1 bg-white max-sm:min-w-[110px] h-auto bg-inherit"
          />
        ))}
      </div>
    </div>
  );
};
