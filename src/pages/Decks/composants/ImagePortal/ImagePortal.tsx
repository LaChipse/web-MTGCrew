import { Portal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type Props = {
    anchor: DOMRect
    illustrationUrl: string
}

const ImagePortal: React.FC<Props> = ({ anchor, illustrationUrl }) => (
    <Portal>
        <Box
            sx={{
                position: 'fixed',
                top:
                anchor.bottom + 210 > window.innerHeight // si dépasse vers le bas
                    ? anchor.top - 220 // place au-dessus
                    : anchor.bottom, // sinon en dessous
                left: anchor.left + anchor.width / 2 + 20,
                transform: 'translateX(-50%)',
                zIndex: 9999,
                padding: '5px',
                borderRadius: '10px',
                backgroundColor: 'transparent', // ou un fond si tu veux un effet popover
            }}
            >
            <img
                src={`${illustrationUrl}?w=164&h=164&fit=crop&auto=format`}
                alt={illustrationUrl}
                style={{ borderRadius: '10px', width: '150px', maxHeight: '210px' }}
                loading='lazy'
            />
        </Box>
    </Portal>
)

export default ImagePortal