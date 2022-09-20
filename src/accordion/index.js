import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import metadata from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';

/**
 * Block Registration
 */

registerBlockType(metadata, {
	icon: {
		src: (
			<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
				<path
					stroke="null"
					id="svg_2"
					fill="#3fa796"
					d="m3.5,1.3333l0,2.52942l17,0l0,-2.52942l-17,0zm16,1.68628l-15,0l0,-0.84314l15,0l0,0.84314zm-16,9.27455l17,0l0,-7.58827l-17,0l0,7.58827zm1,-6.74513l15,0l0,5.90198l-15,0l0,-5.90198zm-1,10.11769l17,0l0,-2.52942l-17,0l0,2.52942zm1,-1.68628l15,0l0,0.84314l-15,0l0,-0.84314z"
				/>
			</svg>
		),
	},
	edit: Edit,
	save: Save,
});
