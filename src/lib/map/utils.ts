export function isWebglSupported() {
	if (window.WebGLRenderingContext) {
		const canvas = document.createElement('canvas');
		try {
			const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
			if (context && typeof context.getParameter == 'function') {
				return true;
			}
		} catch (e) {
		}
		return null;
	}
	return false;
}