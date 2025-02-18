export const LogoIcon: React.FC<SvgProps> = ({
  className,
  width = 31,
  height = 42,
  fill="#1A1A1A",
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 31 42"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3353 11.3618L18.3265 41.8433L21.5809 41.8342L21.5719 31.1944L27.3211 31.1853L27.312 41.8342H30.7184V0.485291L27.3029 2.74996L27.2987 27.9702L21.6077 27.9514L21.6122 5.74603L0 18.2476L0.0290845 35.3841L3.44454 35.3934L3.44896 20.1435L18.3353 11.3618Z"
      />
    </svg>
  );
};
