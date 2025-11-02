import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
        margin: 0,
        fontSize: '13px',
        backdropFilter: 'blur(5px)',
        background: 'rgba(31, 35, 78, 0.7)',
        borderRadius: 15
    },
    [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
        marginBottom: '5px',
    },
});

export default CustomTooltip