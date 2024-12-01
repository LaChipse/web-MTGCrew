import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
        margin: 0,
        fontSize: '13px',
        backgroundColor: 'rgb(29, 29, 29)',
        borderRadius: 8
    },
    [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
        marginBottom: '5px',
    },
});

export default CustomTooltip