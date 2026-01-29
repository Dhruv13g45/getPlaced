import { Grid, Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function PracticeCard({ icon, title, subtitle, tags, link }) {
  return (
  <Grid item xs={12} md={6}>
    <Link to={link}> 
      <Card
        sx={{
          borderRadius: 1,
          boxShadow: 2,
          transition: "0.3s",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                bgcolor: "#f1f3ff",
                p: 1.5,
                borderRadius: 1,
              }}
              >
              {icon}
            </Box>

            <Box>
              <Typography fontWeight={600}>{title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            </Box>
          </Box>

          <Box mt={2} display="flex" gap={1} flexWrap="wrap">
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Link>
    </Grid>
  );
}
