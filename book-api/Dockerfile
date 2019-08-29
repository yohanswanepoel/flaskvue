FROM registry.access.redhat.com/ubi8/ubi-minimal as base

RUN microdnf install python3
RUN python3 -m venv /opt/venv

COPY requirements.txt .
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install -r requirements.txt


FROM registry.access.redhat.com/ubi8/ubi-minimal as run-image
RUN microdnf install python3
COPY --from=base /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /flask

COPY app.py .
CMD ["python3","./app.py"]
