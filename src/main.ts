import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
})

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(3001)
}
bootstrap()
