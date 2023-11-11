const sidebarBusinessInfoRoutes = [
	{
		label: "Legal",
		href: "https://www.spotify.com/pl/legal/",
	},
	{
		label: "Privacy Center",
		href: "https://www.spotify.com/pl/privacy/",
	},
	{
		label: "Privacy Policy",
		href: "https://www.spotify.com/pl/legal/privacy-policy/",
	},
	{
		label: "Cookie Settings",
		href: "https://www.spotify.com/pl/legal/privacy-policy/#s3",
	},
	{
		label: "About Ads",
		href: "https://www.spotify.com/pl/legal/privacy-policy/#s3",
	},
	{
		label: "Accessibility",
		href: "https://www.spotify.com/pl/accessibility/",
	},
];

function BusinessInformationLinks() {
	return (
		<div className="flex flex-wrap select-none text-[0.6875rem] text-start my-8 ">
			{sidebarBusinessInfoRoutes.map(({ href, label }) => (
				<a href={href} className="mr-4 h-8" key={label}>
					{label}
				</a>
			))}
		</div>
	);
}
export default BusinessInformationLinks;
