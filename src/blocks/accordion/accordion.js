import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const { Fragment } = wp.element;

// import icons
import icons from './icons';

/**
 * Block Registration
 */
registerBlockType('esab/accordion-child', {
	title: __('Accordion', 'easy-accordion-block'),
	description: __(
		'Acts as Child Block for Easy Accordion Block',
		'easy-accordion-block'
	),
	usesContext: [
		'esab/accordionBorderWidth',
		'esab/accordionBorderColor',
		'esab/accordionBorderStyle',
		'esab/enableBoxShadow',
		'esab/boxShadowPalette',
		'esab/headingTag',
		'esab/headerSeparator',
		'esab/headerSeparatorColor',
		'esab/headerSeparatorHeight',
		'esab/headerSeparatorStyle',
		'esab/headerTopPadding',
		'esab/headerBottomPadding',
		'esab/headerLeftPadding',
		'esab/headerRightPadding',
		'esab/enableLinkedHeaderPadding',
		'esab/linkedHeaderPadding',
		'esab/bodyTopPadding',
		'esab/bodyBottomPadding',
		'esab/bodyLeftPadding',
		'esab/bodyRightPadding',
		'esab/enableLinkedBodyPadding',
		'esab/linkedBodyPadding',
		'esab/collapsedIcon',
		'esab/expandedIcon',
		'esab/iconPosition',
		'esab/headingColor',
		'esab/headerBg',
		'esab/bodyBg',
	],
	icon: {
		src: (
			<svg width="24" height="24">
				<g>
					<rect
						stroke="#3fa796"
						id="svg_1"
						height="6.16667"
						width="21.5"
						y="8.91667"
						x="1.25"
						fill="#fff"
					/>
				</g>
			</svg>
		),
	},
	supports: {
		html: false,
		anchor: false,
		customClassName: false,
	},
	category: 'esab-blocks',
	parent: ['esab/accordion'],
	attributes: {
		active: {
			type: 'boolean',
			default: false,
		},
		accordionBorderWidth: {
			type: 'number',
			default: 1,
		},
		accordionBorderColor: {
			type: 'string',
			default: '#E0E0E0',
		},
		accordionBorderStyle: {
			type: 'string',
			default: 'solid',
		},
		enableBoxShadow: {
			type: 'boolean',
			default: false,
		},
		boxShadowPalette: {
			type: 'string',
			default: 'bs__one',
		},
		heading: {
			type: 'string',
		},
		headingColor: {
			type: 'string',
		},
		headingTag: {
			type: 'string',
		},
		headerBg: {
			type: 'string',
		},
		headerSeparator: {
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
		bodyBg: {
			type: 'string',
		},
		collapsedIcon: {
			type: 'string',
		},
		expandedIcon: {
			type: 'string',
		},
		iconPosition: {
			type: 'boolean',
			default: false,
		},
	},
	edit: ({ attributes, setAttributes, context, className }) => {
		const {
			active,
			accordionBorderWidth,
			accordionBorderColor,
			accordionBorderStyle,
			enableBoxShadow,
			boxShadowPalette,
			heading,
			headingColor,
			headingTag,
			headerBg,
			iconPosition,
			collapsedIcon,
			expandedIcon,
			headerSeparator,
			headerSeparatorColor,
			headerSeparatorHeight,
			headerSeparatorStyle,
			headerTopPadding,
			headerBottomPadding,
			headerLeftPadding,
			headerRightPadding,
			enableLinkedHeaderPadding,
			linkedHeaderPadding,
			bodyTopPadding,
			bodyBottomPadding,
			bodyLeftPadding,
			bodyRightPadding,
			enableLinkedBodyPadding,
			linkedBodyPadding,
			bodyBg,
		} = attributes;

		// set context values to attributes
		setAttributes({
			accordionBorderWidth: context['esab/accordionBorderWidth'],
			accordionBorderColor: context['esab/accordionBorderColor'],
			accordionBorderStyle: context['esab/accordionBorderStyle'],
			enableBoxShadow: context['esab/enableBoxShadow'],
			boxShadowPalette: context['esab/boxShadowPalette'],
			headingTag: context['esab/headingTag'],
			iconPosition: context['esab/iconPosition'],
			collapsedIcon: context['esab/collapsedIcon'],
			expandedIcon: context['esab/expandedIcon'],
			headerSeparator: context['esab/headerSeparator'],
			headerSeparatorColor: context['esab/headerSeparatorColor'],
			headerSeparatorHeight: context['esab/headerSeparatorHeight'],
			headerSeparatorStyle: context['esab/headerSeparatorStyle'],
			headerTopPadding: context['esab/headerTopPadding'],
			headerBottomPadding: context['esab/headerBottomPadding'],
			headerLeftPadding: context['esab/headerLeftPadding'],
			headerRightPadding: context['esab/headerRightPadding'],
			enableLinkedHeaderPadding:
				context['esab/enableLinkedHeaderPadding'],
			linkedHeaderPadding: context['esab/linkedHeaderPadding'],
			bodyTopPadding: context['esab/bodyTopPadding'],
			bodyBottomPadding: context['esab/bodyBottomPadding'],
			bodyLeftPadding: context['esab/bodyLeftPadding'],
			bodyRightPadding: context['esab/bodyRightPadding'],
			enableLinkedBodyPadding: context['esab/enableLinkedBodyPadding'],
			linkedBodyPadding: context['esab/linkedBodyPadding'],
			headingColor: context['esab/headingColor'],
			headerBg: context['esab/headerBg'],
			bodyBg: context['esab/bodyBg'],
		});
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Accordion Status', 'easy-accordion-block')}
					>
						<ToggleControl
							label={__('Active on Load', 'easy-accordion-block')}
							checked={active}
							onChange={() => setAttributes({ active: !active })}
							help={
								active &&
								__(
									'You have made it Active on Load',
									'easy-accordion-block'
								)
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className={`${className} ${
						enableBoxShadow ? boxShadowPalette : ''
					} ${active ? 'esab__active_accordion' : ''}`}
					style={{
						border: `${accordionBorderWidth}px ${accordionBorderStyle} ${accordionBorderColor}`,
					}}
				>
					<div
						className={`esab__head${
							iconPosition ? ' esab__head_reverse' : ''
						}`}
						style={{
							padding: `${
								enableLinkedHeaderPadding
									? `${linkedHeaderPadding}px`
									: `${headerTopPadding}px ${headerRightPadding}px ${headerBottomPadding}px ${headerLeftPadding}px`
							}`,
							backgroundColor: headerBg
								? headerBg
								: 'transparent',
						}}
						role="button"
						aria-expanded={active}
					>
						<div className="esab__heading_txt">
							<RichText
								tagName={headingTag}
								className={'esab__heading_tag'}
								value={heading}
								onChange={(content) =>
									setAttributes({ heading: content })
								}
								placeholder={__(
									'heading….',
									'easy-accordion-block'
								)}
								allowedFormats={['core/bold', 'core/italic']}
								style={{
									color: headingColor,
								}}
							/>
						</div>
						<div className="esab__icon">
							<div className="esab__collapse">
								{icons[collapsedIcon]}
							</div>
							<div className="esab__expand">
								{icons[expandedIcon]}
							</div>
						</div>
					</div>
					<div
						className="esab__body"
						style={{
							borderTop: headerSeparator
								? `${headerSeparatorHeight}px ${headerSeparatorStyle} ${headerSeparatorColor}`
								: 'none',
							padding: `${
								enableLinkedBodyPadding
									? `${linkedBodyPadding}px`
									: `${bodyTopPadding}px ${bodyRightPadding}px ${bodyBottomPadding}px ${bodyLeftPadding}px`
							}`,
							backgroundColor: bodyBg ? bodyBg : 'transparent',
						}}
					>
						<InnerBlocks
							allowedBlocks={true}
							template={[
								[
									'core/paragraph',
									{
										placeholder: __(
											'type content or press / to add block..',
											'easy-accordion-block'
										),
									},
								],
							]}
						/>
					</div>
				</div>
			</Fragment>
		);
	},
	save: (props) => {
		const { attributes } = props;
		const {
			active,
			accordionBorderWidth,
			accordionBorderColor,
			accordionBorderStyle,
			enableBoxShadow,
			boxShadowPalette,
			heading,
			headingColor,
			headingTag,
			headerBg,
			iconPosition,
			collapsedIcon,
			expandedIcon,
			headerSeparator,
			headerSeparatorColor,
			headerSeparatorHeight,
			headerSeparatorStyle,
			headerTopPadding,
			headerBottomPadding,
			headerLeftPadding,
			headerRightPadding,
			enableLinkedHeaderPadding,
			linkedHeaderPadding,
			enableLinkedBodyPadding,
			linkedBodyPadding,
			bodyTopPadding,
			bodyBottomPadding,
			bodyLeftPadding,
			bodyRightPadding,
			bodyBg,
		} = attributes;
		return (
			<div
				{...useBlockProps.save({
					className: `${enableBoxShadow ? boxShadowPalette : ''} ${
						active ? 'esab__active_accordion' : ''
					}`,
				})}
				style={{
					border: `${accordionBorderWidth}px ${accordionBorderStyle} ${accordionBorderColor}`,
				}}
			>
				<div
					className={`esab__head${
						iconPosition ? ' esab__head_reverse' : ''
					}`}
					style={{
						padding: `${
							enableLinkedHeaderPadding
								? `${linkedHeaderPadding}px`
								: `${headerTopPadding}px ${headerRightPadding}px ${headerBottomPadding}px ${headerLeftPadding}px`
						}`,
						backgroundColor: headerBg ? headerBg : 'transparent',
					}}
					role="button"
					aria-expanded={active}
				>
					<div className="esab__heading_txt">
						<RichText.Content
							tagName={headingTag}
							className={'esab__heading_tag'}
							value={heading}
							style={{
								color: headingColor,
							}}
						/>
					</div>
					<div
						className={`esab__icon${
							active ? ' esab__active_icon' : ''
						}`}
					>
						<div className="esab__collapse">
							{icons[collapsedIcon]}
						</div>
						<div className="esab__expand">
							{icons[expandedIcon]}
						</div>
					</div>
				</div>
				<div
					className={`esab__body${active ? ' esab__active' : ''}`}
					style={{
						borderTop: headerSeparator
							? `${headerSeparatorHeight}px ${headerSeparatorStyle} ${headerSeparatorColor}`
							: 'none',
						padding: `${
							enableLinkedBodyPadding
								? `${linkedBodyPadding}px`
								: `${bodyTopPadding}px ${bodyRightPadding}px ${bodyBottomPadding}px ${bodyLeftPadding}px`
						}`,
						backgroundColor: bodyBg ? bodyBg : 'transparent',
					}}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
