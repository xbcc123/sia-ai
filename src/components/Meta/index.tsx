import { Helmet, useModel } from '@umijs/max';

export const Meta = () => {
  const { initialState } = useModel('@@initialState');
  const { setting } = initialState;
  return (
    <>
      <Helmet>
        <title>{setting?.name}</title>
		<link rel="icon" type="image/x-ico" href={`${setting?.domain}${setting?.logo}`} />
        <meta name="description" content={setting?.description} />
        <meta property="keywords" content={setting?.keyword} />
      </Helmet>
    </>
  );
};
