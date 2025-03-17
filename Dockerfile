# Use the official Odoo image as the base image
FROM odoo:18.0

# Set environment variables
ENV HOST=db
ENV USER=odoo
ENV PASSWORD=odoo

# Set the working directory
WORKDIR /mnt/extra-addons

# Copy your custom modules into the container
COPY ./odoo-18/addons/market_management /mnt/extra-addons/market_management

# Copy the modified web module
COPY ./odoo-18/addons/web /usr/lib/python3/dist-packages/odoo/addons/web

# Expose the Odoo port
EXPOSE 8069

# Start Odoo
CMD ["odoo", "-i", "base", "--without-demo=all"]
