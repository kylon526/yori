<script lang="ts">
	import { SignIn } from 'svelte-clerk';
	import Card from '../cards/Card.svelte';
</script>

<div
	style={`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`}
>
	<Card
		style={`
  display: flex;
  flex-direction: column;
  align-items: center;
`}
	>
		<h1>Welcome to Yori!</h1>
		<p>A human approach to hiring</p>
		<SignIn oauthFlow="popup" withSignUp={true} />
	</Card>
</div>
