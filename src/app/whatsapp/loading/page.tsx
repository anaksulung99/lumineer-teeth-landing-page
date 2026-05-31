import { WhatsappRedirectLoading } from "./WhatsappRedirectLoading";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function readParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function WhatsappLoadingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  // const groupId = readParam(params, "group_id");
  const groupId = params["group_id"];
  const landingPageId = readParam(params, "landing_page_id");
  const source = readParam(params, "source") || "landing-page";

  // if (!groupId) {
  //   return <WhatsappRedirectLoading rotateUrl={null} />;
  // }
  if (!groupId || Array.isArray(groupId)) {
    return <WhatsappRedirectLoading rotateUrl={null} />;
  }

  // const rotateParams = new URLSearchParams({
  //   group_id: groupId,
  //   source,
  // });

  const rotateParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      rotateParams.set(key, Array.isArray(value) ? value[0] : value);
    }
  });

  // if (landingPageId) {
  //   rotateParams.set("landing_page_id", landingPageId);
  // }

  // return (
  //   <WhatsappRedirectLoading
  //     rotateUrl={`/api/whatsapp/rotate?${rotateParams.toString()}`}
  //   />
  // );

  return (
    <WhatsappRedirectLoading
      rotateUrl={`/api/whatsapp/rotate?${rotateParams.toString()}`}
    />
  );
}
