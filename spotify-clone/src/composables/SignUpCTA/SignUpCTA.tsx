import Button from "@/components/Button/Button";

interface SignUptCTAProps {
	onClick?: () => void;
}

function SignUptCTA() {
	return (
		<footer className="flex basis-full pt-3 pb-2 pl-6 pr-4 justify-between items-center cursor-pointer bg-gradient-to-r from-fuchsia-700 to-blue-400 h-fit">
			<div>
				<p className=" uppercase tracking-widest text-xs">Preview of Spotify</p>
				<p className=" font-semibold">
					Sign up to get unlimited songs and podcasts with occasional ads. No
					credit card needed.
				</p>
			</div>
			<Button variant="light-lg" onClick={() => null}>
				Sign up free
			</Button>
		</footer>
	);
}
export default SignUptCTA;
