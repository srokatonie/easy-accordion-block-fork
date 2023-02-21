/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const deprecatedV1 = {
	supports: {
		html: false,
		anchor: false,
		customClassName: false,
	},
	attributes: {
		uniqueId: {
			type: 'string',
		},
		accordionsGap: {
			type: 'number',
			default: 10,
		},
		marginTop: {
			type: 'string',
			default: '0',
		},
		marginBottom: {
			type: 'string',
			default: '0',
		},
		marginLeft: {
			type: 'string',
			default: '0',
		},
		marginRight: {
			type: 'string',
			default: '0',
		},
		enableLinkedMargin: {
			type: 'boolean',
			default: false,
		},
		linkedMargin: {
			type: 'string',
			default: '0',
		},
		accordionBorderWidth: {
			type: 'number',
			default: 1,
		},
		accordionBorderStyle: {
			type: 'string',
			default: 'solid',
		},
		accordionBorderPopOver: {
			type: 'boolean',
			default: false,
		},
		accordionBorderColor: {
			type: 'string',
			default: '#E0E0E0',
		},
		accordionActiveBorderPopOver: {
			type: 'boolean',
			default: false,
		},
		accordionActiveBorderColor: {
			type: 'string',
			default: '#3fa796',
		},
		accordionBorderRadius: {
			type: 'number',
			default: 3,
		},
		enableBoxShadow: {
			type: 'boolean',
			default: false,
		},
		boxShadowPalette: {
			type: 'string',
			default: 'bs__one',
		},
		customColorsPallete: {
			type: 'boolean',
			default: false,
		},
		headingTag: {
			type: 'string',
			default: 'p',
		},
		headingColorPopOver: {
			type: 'boolean',
			default: false,
		},
		headingColor: {
			type: 'string',
		},
		headingActiveColorPopOver: {
			type: 'boolean',
			default: false,
		},
		headingActiveColor: {
			type: 'string',
			default: '#3fa796',
		},
		headerBgPopOver: {
			type: 'boolean',
			default: false,
		},
		headerBg: {
			type: 'string',
		},
		headerActiveBgPopOver: {
			type: 'boolean',
			default: false,
		},
		headerActiveBg: {
			type: 'string',
			default: '#f0fffd',
		},
		headerTopPadding: {
			type: 'string',
			default: '10',
		},
		headerBottomPadding: {
			type: 'string',
			default: '10',
		},
		headerLeftPadding: {
			type: 'string',
			default: '10',
		},
		headerRightPadding: {
			type: 'string',
			default: '10',
		},
		enableLinkedHeaderPadding: {
			type: 'boolean',
			default: false,
		},
		linkedHeaderPadding: {
			type: 'string',
			default: '10',
		},
		headerSeparator: {
			type: 'boolean',
			default: true,
		},
		headerSeparatorPopOver: {
			type: 'boolean',
			default: false,
		},
		headerSeparatorColor: {
			type: 'string',
			default: '#E0E0E0',
		},
		headerSeparatorHeight: {
			type: 'number',
			default: 1,
		},
		headerSeparatorStyle: {
			type: 'string',
			default: 'solid',
		},
		activeSeparatorPopOver: {
			type: 'boolean',
			default: false,
		},
		activeSeparatorColor: {
			type: 'string',
			default: '#3fa796',
		},
		iconSize: {
			type: 'number',
			default: 20,
		},
		iconPosition: {
			type: 'boolean',
			default: false,
		},
		collapsedIcon: {
			type: 'string',
			default: 'esab__circle_plus',
		},
		expandedIcon: {
			type: 'string',
			default: 'esab__circle_minus',
		},
		activeIconPopOver: {
			type: 'boolean',
			default: false,
		},
		activeIconColor: {
			type: 'string',
			default: '#3fa796',
		},
		inactiveIconPopOver: {
			type: 'boolean',
			default: false,
		},
		inactiveIconColor: {
			type: 'string',
		},
		bodyBgPopOver: {
			type: 'boolean',
			default: false,
		},
		bodyBg: {
			type: 'string',
		},
		bodyActiveBgPopOver: {
			type: 'boolean',
			default: false,
		},
		bodyActiveBg: {
			type: 'string',
			default: '#f0fffd',
		},
		bodyTopPadding: {
			type: 'string',
			default: '10',
		},
		bodyBottomPadding: {
			type: 'string',
			default: '10',
		},
		bodyLeftPadding: {
			type: 'string',
			default: '10',
		},
		bodyRightPadding: {
			type: 'string',
			default: '10',
		},
		enableLinkedBodyPadding: {
			type: 'boolean',
			default: false,
		},
		linkedBodyPadding: {
			type: 'string',
			default: '10',
		},
		zindex: {
			type: 'number',
		},
		customClass: {
			type: 'string',
		},
		anchorId: {
			type: 'string',
		},
	},
	save: ({ attributes }) => {
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
				id={anchorId ? anchorId : null}
			>
				<div
					className="esab__container"
					style={{
						rowGap: `${accordionsGap}px`,
						margin: `${
							enableLinkedMargin
								? `${linkedMargin}px`
								: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`
						}`,
					}}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};
export default deprecatedV1;
