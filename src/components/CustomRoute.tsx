const CustomRoute = ({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) => {
  return window.location.pathname === path ? children : null;
};

export default CustomRoute;
