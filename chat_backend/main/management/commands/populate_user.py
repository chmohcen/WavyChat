import random

from django.core.management.base import BaseCommand

from main.models import User

FIRST_NAMES = (
    'Olivia', 'Liam', 'Emma', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
    'Isabella', 'Lucas', 'Mia', 'Elijah', 'Amelia', 'James', 'Charlotte',
    'Benjamin', 'Harper', 'Henry', 'Evelyn', 'Alexander',
)

LAST_NAMES = (
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
    'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
)

STATUSES = ('online', 'away', 'offline')


class Command(BaseCommand):
    help = 'Populate the app with random users.'

    def add_arguments(self, parser):
        parser.add_argument('--users', type=int, default=10, help='Number of users to create')
        parser.add_argument(
            '--clear', action='store_true',
            help='Delete existing non-staff, non-superuser users before populating',
        )

    def handle(self, *args, **options):
        user_count = options['users']
        clear = options['clear']

        if clear:
            self.stdout.write('Deleting existing non-staff users...')
            User.objects.filter(is_staff=False, is_superuser=False).delete()

        self.stdout.write(f'Creating {user_count} users...')
        created = 0
        while created < user_count:
            first_name = random.choice(FIRST_NAMES)
            last_name = random.choice(LAST_NAMES)
            email = f'{first_name.lower()}.{last_name.lower()}{random.randint(1, 9999)}@example.com'

            if User.objects.filter(email=email).exists():
                continue

            User.objects.create_user(
                email=email,
                password='password123',
                name=f'{first_name} {last_name}',
                status=random.choice(STATUSES),
            )
            created += 1

        self.stdout.write(self.style.SUCCESS('User population complete!'))
        self.stdout.write(f'Users created: {created}')
