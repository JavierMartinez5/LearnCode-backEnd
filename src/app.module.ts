import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { TheoryModule } from './features/tutorial/theory/theory.module';
import { TestsModule } from './features/tutorial/tests/tests.module';
import { PracticeModule } from './features/tutorial/practice/practice.module';
import { CommentsModule } from './features/tutorial/comments/comments.module';
import { NavDataModule } from './features/tutorial/nav-data/nav-data.module';
import { TutorialNamesModule } from './features/tutorial/tutorial-names/tutorial-names.module';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot('mongodb+srv://Sprins55:kjhlthjy@cluster0.brapo.mongodb.net/LearnCode?retryWrites=true&w=majority'), TheoryModule, TestsModule, PracticeModule, CommentsModule, NavDataModule, TutorialNamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
