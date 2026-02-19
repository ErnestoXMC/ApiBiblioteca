import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthorModule } from 'src/author/author.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthorModule]
})
export class SeedModule {}
