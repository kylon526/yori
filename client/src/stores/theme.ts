import { get, writable } from 'svelte/store';

const getPreferredTheme = () => {
	if (typeof window !== 'undefined' && window.matchMedia) {
		console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light';
};

const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
export const theme = writable(storedTheme || getPreferredTheme());

console.log(get(theme));

theme.subscribe((value) => {
	if (typeof document !== 'undefined') {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(value);
	}
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('theme', value);
	}
});
