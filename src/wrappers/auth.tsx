import { Navigate, Outlet, useAccess } from '@umijs/max';

export default (props: any) => {
  const { canSeeAdmin } = useAccess();
  if (canSeeAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to="/404" />;
  }
};
