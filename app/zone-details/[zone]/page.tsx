import ZoneDetails from "@/components/zone-details"

export default function ZoneDetailsPage({ params }: { params: { zone: string } }) {
  return <ZoneDetails zone={params.zone} />
}
