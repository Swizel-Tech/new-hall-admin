import { ClassArray } from "clsx";
import { cn, createAvatarUrl } from "../../../utils/helpers";

interface AvatarProps {
  name: string;
  children?: React.ReactNode;
  img?: string;
  avatarClassName?: string;
  textClassName?: string;
  wrapperClassName?: string;
  avatarTextContainerClassName?: string;
  rounded?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const {
    img,
    name,
    children,
    avatarClassName,
    textClassName,
    wrapperClassName,
    avatarTextContainerClassName,
    rounded,
  } = props;

  const cnFn = (...inputs: ClassArray) =>
    cn(
      "h-10 w-10 rounded-md",
      rounded && "rounded-full",
      inputs,
      avatarClassName
    );

  return (
    <div className={cn("flex bg-white items-center gap-2", wrapperClassName)}>
      {img ? (
        <img
          src={img}
          className={cnFn("")}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = createAvatarUrl({
              avatarUrl: name,
              additionalParams: { background: "A2A1A833" },
            });
          }}
        />
      ) : (
        <div
          style={{
            backgroundImage: `url(${createAvatarUrl({
              avatarUrl: name,
              additionalParams: { background: "A2A1A833" },
            })})`,
          }}
          className={cnFn("bg-cover bg-center")}
        />
      )}
      <div className={cn("bg-white", avatarTextContainerClassName)}>
        <p className={textClassName}>{name}</p>
        {children}
      </div>
    </div>
  );
};
