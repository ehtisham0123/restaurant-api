FROM node:20.10.0

# Check OpenSSL version
RUN openssl version -v

# Check system information
RUN uname -a

# Print the value of DATABASE_URL environment variable
RUN echo $DATABASE_URL

# Create app directory
WORKDIR /app

# Install Prisma globally with unsafe permissions
RUN npm install -g prisma --unsafe-perm

# Copy schema and migration folder
COPY ./ ./prisma/

# Define the default command to run Prisma migration
CMD [ "prisma", "migrate", "up", "--experimental"]
