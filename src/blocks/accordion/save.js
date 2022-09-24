import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
export default function save({ attributes }) {
	const {
		uniqueId,
		accordionsGap,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		enableLinkedMargin,
		linkedMargin,
		anchorId,
		customClass,
	} = attributes;
	return (
		<div
			{...useBlockProps.save({
				className: `${uniqueId} ${customClass ? customClass : ''}`,
			})}
			style={{
				rowGap: `${accordionsGap}px`,
				margin: `${
					enableLinkedMargin
						? `${linkedMargin}px`
						: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`
				}`,
			}}
			id={anchorId ? anchorId : null}
		>
			<InnerBlocks.Content />
		</div>
	);
}
