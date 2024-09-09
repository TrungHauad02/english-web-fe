import { Stack, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

function ListTopicContent({ listTopic }) {
  return (
    <Stack spacing={4} sx={{ paddingX: '5%' }}>
      <Grid container spacing={4} justifyContent="center">
        {listTopic.map((topic, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={6} sx={{overflow:'visible'}}>
            <Card sx={{ display: 'flex', height: '250px' }}>
              <CardMedia
                component="img"
                sx={{ width: 250, objectFit: 'cover' }}
                image={topic.img}
                alt={topic.title}
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
                  {topic.title}
                </Typography>
                <Typography variant="body2" sx={{ paddingBottom: '1rem' }}>
                  {topic.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default ListTopicContent;
