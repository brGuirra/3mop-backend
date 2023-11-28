import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Contacts Manager API')
    .setDescription('The API offers resources to manage a contatcs list')
    .setVersion(process.env.npm_package_version)
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'X-Api-Key',
      },
      'Api-Key',
    )
    .addTag(
      'Contacts',
      'Resources to perform CRUD operations related to contacts entities',
    )
    .addTag(
      'Addresses',
      'Resources to CRUD operations related to addresses entities',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Contacts Manager API',
  });
}
