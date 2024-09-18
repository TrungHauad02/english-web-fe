import { Stack, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

function ListContent({ list }) {
  return (
    <Stack spacing={4} sx={{ paddingX: '5%' }}>
      <Grid container spacing={4} justifyContent="center">
        {list.map((content) => (
          <Grid item key={content.id} xs={12} sm={6} md={6} lg={6} sx={{overflow:'visible'}}>
            <Card sx={{ display: 'flex', height: '250px' }}>
              <CardMedia
                component="img"
                sx={{ width: 250, objectFit: 'cover' }}
                image={content.img}
                alt={content.title}
              />
              <CardContent sx={{ 
                    flex: '1', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    paddingBottom: '1rem', 
                    height:'200px'
                    }}>
                <Typography variant="h6" component="h3" sx={{ marginBottom: '0.5rem' }}>
                  {content.title}
                </Typography>
                <Typography variant="body2" sx={{ paddingBottom: '1rem' }}>
                  {content.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default ListContent;
