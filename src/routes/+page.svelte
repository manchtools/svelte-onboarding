<script>
	import onboardingSteps from "$lib/onboarding";
	import { onboardSteps } from "$lib/store";

	onboardSteps.setSteps([
		"Hello",
		"Erbsen sind echt tolle sachen, man kann sie Braten kochen und sonstige sachen damit machen",
		"Erbsen"
	]);
</script>

<div use:onboardingSteps={0}>Hallo welt</div>
<p>
	Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
	labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
	dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
	amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
	invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
	justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
	dolor sit amet.
</p>
<div style="margin-top: 20%;" use:onboardingSteps={1}>Kartoffeln</div>
<span style="margin-top: 150%" use:onboardingSteps={2}>Erbsen</span>
