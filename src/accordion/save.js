// import { __ } from '@wordpress/i18n';
/**
 * Styled Components
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
export default function save({ attributes }) {
	const { accordionsGap } = attributes;
	return (
		<div
			{...useBlockProps.save()}
			style={{
				rowGap: `${accordionsGap}px`,
			}}
		>
			<InnerBlocks.Content />
		</div>
	);
}
