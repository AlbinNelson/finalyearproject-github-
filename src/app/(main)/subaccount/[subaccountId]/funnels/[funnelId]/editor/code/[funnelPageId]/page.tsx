import Code from "../code"


type PageProps = {
  params: {
    subaccountId: string
    funnelId: string
    funnelPageId: string
  }
}

export default function CodePage({ params }: PageProps) {
  return <Code 
    funnelId={params.funnelId}
    subaccountId={params.subaccountId} 
    funnelPageId={params.funnelPageId}
  />
}
  