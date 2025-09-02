import { Chip } from '@mui/material';

const statusConfig = {
  'Booked': { color: 'warning', label: 'Booked' },
  'Confirmed': { color: 'success', label: 'Confirmed' },
  'Paid': { color: 'success', label: 'Paid' },
  'Pending': { color: 'warning', label: 'Pending' },
  'Cancelled': { color: 'error', label: 'Cancelled' },
  'Failed': { color: 'error', label: 'Failed' }
};

export default function StatusChip({ status }) {
  const config = statusConfig[status] || { color: 'default', label: status };
  
  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="outlined"
      sx={{ 
        ml: 1,
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }}
    />
  );
}