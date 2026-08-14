export const regions = [
  {
    slug: "malakand",
    name: "Malakand Region",
    description: "Covering Swat, Dir, Chitral and the wider Malakand division.",
  },
  {
    slug: "peshawar",
    name: "Peshawar Region",
    description: "KMU's main campus region, covering Peshawar and surrounding districts.",
  },
  {
    slug: "mardan",
    name: "Mardan Region",
    description: "Covering Mardan, Swabi and neighbouring districts.",
  },
  {
    slug: "hazara",
    name: "Hazara Region",
    description: "Covering Abbottabad, Haripur, Mansehra and the Hazara division.",
  },
  {
    slug: "kohat",
    name: "Kohat Region",
    description: "Covering Kohat, Hangu, Karak and surrounding districts.",
  },
  {
    slug: "bannu",
    name: "Bannu Region",
    description: "Covering Bannu, Lakki Marwat and surrounding districts.",
  },
  {
    slug: "dera-ismail-khan",
    name: "Dera Ismail Khan Region",
    description: "Covering Dera Ismail Khan, Tank and the southern districts.",
  },
];

export function getRegion(slug) {
  return regions.find((r) => r.slug === slug);
}
