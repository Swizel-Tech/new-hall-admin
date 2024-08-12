import { cn } from "../../../utils/helpers";

export interface DashboardCardProps {
  icon: React.ComponentType<any>;
  chart: React.ComponentType<any>;
  title: string;
  value: number;
  icbg: string;
  txbg: string;
  upcolor: string;
  msg: string;
  percentage: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  className?: string;
}

export const DashboardCard = (props: DashboardCardProps) => {
  const {
    children,
    icon: Icon,
    chart: Chart,
    title,
    value,
    icbg,
    txbg,
    upcolor,
    msg,
    percentage,
  } = props;

  return (
    <div
      className={cn(
        "rounded-[8px] bg-white w-full px-[22px] flex justify-between gap-2 items-start flex-col py-[12px] h-full"
      )}
    >
      <div className="w-full flex justify-between items-center bg-white h-[100px]  flow-row">
        <div className="bg-inherit w-[200px] flex justify-between gap-4 items-start flex-col">
          <h2 className="text-[12px] font-semibold bg-inherit font-DMSans">
            {title}
          </h2>
          <h2 className="text-[14px] bg-inherit  font-bold font-DMSans">
            {value}
          </h2>
        </div>
        <div
          className={cn(
            "rounded-full w-[44px] flex justify-center items-center h-[44px] p-[5px]",
            icbg && icbg
          )}
        >
          <Icon className={cn("w-[24px] bg-inherit h-[24px]", txbg && txbg)} />
        </div>
      </div>
      <div className="w-full flex bg-inherit flex-row justify-between items-center">
        <div className="bg-inherit gap-2 flex justify-center items-center">
          <Chart
            className={cn("w-[24px] bg-inherit h-[24px]", upcolor && upcolor)}
          />
          <p
            className={cn(
              "bg-inherit text-[14px] font-semibold font-DMSans",
              upcolor && upcolor
            )}
          >
            {percentage}
          </p>
        </div>
        <p className="bg-inherit text-[12px] font-normal font-DMSans text-[#8F94A8]">
          {msg}
        </p>
      </div>
      {children && (
        <div
          className={cn("border-t bg-inherit  border-t-themeGrey/20 py-2.5")}
        >
          {children}
        </div>
      )}
    </div>
  );
};
