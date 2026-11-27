type IconProps = { className?: string };

/** A small round "!" icon, used next to error messages. */
export const AlertIcon = ({ className = "size-4" }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-1-11.5a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4Zm1 8.25a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z"
    />
  </svg>
);